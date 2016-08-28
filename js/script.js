$(function() {
	var app = {
		$faqBtn: $("#openFaq"),
		$faqDetails: $(".faq-det"),
		$mainNav: $("main header:first-child"),

		init: function() {
			this.toggleFaq();
			this.registerHandlers();
			this.toggleNavFixed();
		},

		registerHandlers: function() {
			var self = this;
			this.$faqBtn.click(function(e) {
				e.preventDefault();
				self.toggleFaq();
			});

			$(window).scroll(function(e) {
				self.toggleNavFixed();
			});
		},

		toggleFaq: function() {
			this.$faqDetails.slideToggle();
		},

		toggleNavFixed: function() {
			var self = this;
			if($(window).scrollTop() >= $("main").offset().top) {
				if(!self.$mainNav.hasClass("cs-fixed-top")) self.$mainNav.addClass("cs-fixed-top");
			} else {
				if(self.$mainNav.hasClass("cs-fixed-top")) self.$mainNav.removeClass("cs-fixed-top");
			}
		}
	};

	app.init();
});
