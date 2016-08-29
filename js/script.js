$(function() {
	var app = {
		$faqBtn: $("#openFaq"),
		$faqDetails: $(".faq-det"),
		$mainNav: $("main header:first-child"),
		$sideNav: $(".side-nav"),
		$mainHamburger: $(".hero .hamburger"),
		cachedScrollVal: 0,

		init: function() {
			this.toggleFaq();
			this.registerHandlers();
			this.toggleNavFixed();
			this.toggleSideNav();
			$('<div class="overlay hidden"></div>').appendTo("body");
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

			$(".to-top").click(function() {
				$("body").animate({
					scrollTop: 0
				}, 500);
			});

			$(".hamburger").click(function() {
				self.toggleSideNav();
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
		},

		toggleSideNav: function() {
			$(".overlay").toggleClass("hidden");
			this.$sideNav.toggleClass("cs-snav-closed");
			if(this.$sideNav.hasClass("cs-snav-closed")) {
				this.$mainHamburger.css({
					position: "absolute"
				});
			} else {
				this.$mainHamburger.css({
					position: "fixed"
				});
			}
		}
	};

	app.init();
});
