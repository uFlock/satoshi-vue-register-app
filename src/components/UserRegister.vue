<template>
    <div class="col-lg-8 container mt-3">
        <div v-if="showSubmitError" class="alert alert-danger" role="alert">
            {{ submitError }}
        </div>
        <div v-if="showSubmitSuccess">
            <div class="alert alert-success" role="alert">
                Registration Complete.
            </div>
            <a :href="urls.nextContainer">
                <button class="col-lg-12 btn btn-primary">Go To Next Container</button>
            </a>
        </div>
        <div v-if="!showSubmitSuccess" class="card text-center">
            <div class="card-header blue">
                Simple Register Form
            </div>
            <div class="card-body">
                <div class="alert alert-light" role="alert">
                    All fields are mandatory
                </div>
                <form @submit.prevent="submitForm" class="row g-3 justify-content-center">
                    <div class="col-lg-6">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-floating">
                                    <input v-model="username"
                                           id="username"
                                           type="text"
                                           class="form-control"
                                           :class="usernameValidClass"
                                           placeholder="Username"
                                           aria-label="Username"
                                           maxlength="20"
                                           @keyup="removeWhiteSpaces"
                                           required
                                    >
                                    <label for="username">Username</label>
                                </div>
                            </div>
                            <div class="col-lg-12 mt-1">
                                <div class="form-floating">
                                    <input v-model="password"
                                           id="password"
                                           type="password"
                                           class="form-control"
                                           :class="passwordValidClass"
                                           minlength="8"
                                           maxlength="25"
                                           placeholder="Password"
                                           aria-label="Password"
                                           @keyup="removeWhiteSpaces"
                                           required
                                    >
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div class="col-lg-12 mt-1">
                                <div class="form-floating">
                                    <input v-model="age"
                                           id="age"
                                           type="number"
                                           class="form-control"
                                           :class="ageValidClass"
                                           placeholder="Age"
                                           aria-label="Age"
                                           @keyup="limitAge"
                                           required
                                    >
                                    <label for="age">Age</label>
                                </div>
                            </div>
                            <div class="col-lg-12 mt-1">
                                <div class="form-floating">
                                    <input v-model="score"
                                           id="score"
                                           type="number"
                                           class="form-control"
                                           :class="scoreValidClass"
                                           placeholder="Score"
                                           aria-label="Score"
                                           @keyup="limitScore"
                                           required
                                    >
                                    <label for="score">Score</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 mt-2">
                            <button v-if="!submittingForm"
                                    type="submit"
                                    class="col-lg-12 btn"
                                    :class="submitButtonDisabled ? 'btn-secondary' : 'btn-success'"
                                    :disabled="submitButtonDisabled">
                                Register
                            </button>
                            <button v-else
                                    class="col-lg-12 btn btn-success"
                                    disabled
                            >
                                Submitting...
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

const superagent = require("superagent/lib/client");

const SERVICE_UNAVAILABLE = 'Service Unavailable';
const NO_INTERNET_CONNECTION = 'No Internet Connection';

const VUE_APP_NEXT_CONTAINER_URL = process.env.VUE_APP_NEXT_CONTAINER_URL;
const VUE_APP_REGISTER_API_URL = process.env.VUE_APP_REGISTER_API_URL;

export default {
    name: "UserRegister",
    data: () => {
        return {
            username: "",
            password: "",
            age: null,
            score: null,
            test_string: 'Not Submitted',
            showSubmitSuccess: false,
            submittingForm: false,
            showSubmitError: false,
            submitError: '',
            urls: {
                nextContainer: VUE_APP_NEXT_CONTAINER_URL,
                registerApi: VUE_APP_REGISTER_API_URL
            },
        }
    },
    computed: {
        usernameValidClass() {
            return this.username.length >= 3 && this.username.length <= 20 ? 'is-valid' : '';
        },
        passwordValidClass() {
            return this.password.length >= 8 && this.username.length <= 25 ? 'is-valid' : '';
        },
        ageValidClass() {
            return this.age && this.age > 0 && this.age <= 125 ? 'is-valid' : '';
        },
        scoreValidClass() {
            return this.score !== null && this.score >= 0 && this.score <= 1000 ? 'is-valid' : '';
        },
        formIsValid() {
            return this.usernameValidClass && this.passwordValidClass && this.ageValidClass && this.scoreValidClass;
        },
        submitButtonDisabled() {
            return !this.formIsValid;
        }
    },
    methods: {
        removeWhiteSpaces() {
            if (this.username.search(" ")) {
                this.username = this.username.trim();
            }
        },
        limitAge() {

            if (this.age) {

                if (this.age <= 0) {
                    this.age = 1;
                } else if (this.age > 125) {
                    this.age = 125
                }
            }

            if (this.age === '') { //handle e
                this.age = 1;
            }
        },
        limitScore() {

            if (this.score || this.score===0) {

                if (this.score <= 0) {
                    this.score = 0;
                } else if (this.score > 1000) {
                    this.score = 1000
                }
            }

            if (this.score === '') { //handle e
                this.score = 0;
            }
        },
        async submitForm() {

            if (navigator.onLine) {

                this.submittingForm = true;
                this.showSubmitSuccess = false;
                this.showSubmitError = false;
                this.submitError = '';

                const form = {
                    username: this.username,
                    password: this.password,
                    age: this.age,
                    score: this.score
                };

                try {

                    await superagent
                            .post(this.urls.registerApi)
                            .withCredentials()
                            .send(form);

                    this.showSubmitSuccess = true;
                    this.submittingForm = false;

                } catch (err) {

                    this.submittingForm = false;
                    this.showSubmitError = true;

                    this.submitError = err && err.response ?
                            err.response.text || err.response.body :
                            SERVICE_UNAVAILABLE
                }

            } else {

                this.submittingForm = false;
                this.showSubmitError = true;

                this.submitError = NO_INTERNET_CONNECTION
            }
        }
    }
};
</script>

<style>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: block;
    margin: 0 10px;
}

a {
    color: #1890A9;
}

label {
    padding: 5px;
    display: block;
}

.blue {
    background: #e3f2fd;
}
</style>
