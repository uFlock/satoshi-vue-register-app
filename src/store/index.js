import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {
			loggedIn: false,
			data: {
				name: '',
				age: 0
			}
		}
	},
	getters: {
		getAge: state => state.user.data.age,
		getName: state => state.user.data.name,
	},
	mutations: {
		setAge: (state, payload) => state.user.data.age = payload,
		setName: (state, payload) => state.user.data.name = payload,
	},
	actions: {},
	modules: {}
});
