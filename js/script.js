$(function() {
	var app = {
		$faqBtn: $("#openFaq"),
		$faqDetails: $(".faq-det"),


		init: function() {
			this.toggleFaq();
			this.registerHandlers();
		},

		toggleFaq: function() {
			this.$faqDetails.slideToggle();
		},

		registerHandlers: function() {
			var self = this;
			this.$faqBtn.click(function(e) {
				e.preventDefault();
				self.toggleFaq();
			});
		}
	};

	app.init();
});
