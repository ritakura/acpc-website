let vue = new Vue({
	el: '#seatsRemaining',
	data: {
		endpoint:"https://canis.jasonfeng365.top/api/contests/53807620/signups/",

		registered:0,
		onePersonTeams:0,
		twoPersonTeams:0,

		capacity:200,

		seatsRemaining:"",
	},
	methods: {
		sendRequest() {
			fetch(this.endpoint, {
				method: "GET",
				headers: new Headers({
					"ngrok-skip-browser-warning": true
				})
			})
			.then(success => {
				success.json().then(json => {
					this.registered = json.responseCount
					console.log(json)

					this.onePersonTeams = json.teamSizeMap["No"]
					this.twoPersonTeams = Math.floor(json.teamSizeMap["Yes"] / 2)

					this.setText()
				})
			})

		},
		setText() {
			this.seatsRemaining = Math.max(0, this.capacity - this.registered)
			this.seatsRemaining += " spots left!"
			console.log(this.registered)
			console.log(this.onePersonTeams)
			console.log(this.twoPersonTeams)


		}
	},
	mounted: function() {
		this.sendRequest()
	}
});
