$(function() {
	var app = {
		$faqBtn: $("#openFaq"),
		$faqDetails: $(".faq-det"),
		$mainNav: $("main header:first-child"),
		cachedScrollVal: 0,

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
				self.navAutoHide(self.cachedScrollVal);
				self.cachedScrollVal = $(window).scrollTop();
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
		},

		navAutoHide: function(cachedScrollVal) {
			var scrollVal = $(window).scrollTop();

			if(scrollVal >= $(".competitions").offset().top) {
				if(scrollVal <= cachedScrollVal)
					this.$mainNav.removeClass("cs-nav-slideup");
				else if(this.$mainNav.height() !== 0) this.$mainNav.addClass("cs-nav-slideup");
			}
			else {
				this.$mainNav.removeClass("cs-nav-slideup");
			}
		}
	};

	app.init();
});
