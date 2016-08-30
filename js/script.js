$(function() {
	var app = {
		$faqBtn: $("#openFaq"),
		$faqDetails: $(".faq-det"),
		$mainNav: $("main header:first-child"),
		$sideNav: $(".side-nav"),
		$mainHamburger: $(".hero .hamburger"),
		cachedScrollVal: 0,
		$prevButton: $(".slide-nav .prev"),
		$nextButton: $(".slide-nav .next"),
		$slides: $(".slider-wrapper .panel"),
		currentSlide: 0,

		init: function() {
			this.totalSlides = this.$slides.length;
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

			$(document).click(function(e) {
				console.log(e.target);
				if($(e.target).closest($(".hamburger")).length === 0 &&
					$(e.target).closest(self.$sideNav).length === 0) {
					self.closeSideNav();
				}
			});

			this.$nextButton.click(function(e) {
				self.nextSlide();
			});

			this.$prevButton.click(function(e) {
				self.prevSlide();
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
		},

		closeSideNav: function() {
			$(".overlay").addClass("hidden");
			this.$sideNav.addClass("cs-snav-closed");
			this.$mainHamburger.css({
				position: "absolute"
			});
		},

		nextSlide: function() {
			var currIndex = this.currentSlide;
			var curr = this.$slides.eq(currIndex);

			if(currIndex + 1 < this.totalSlides) {
				curr.addClass("cs-left");

				curr.one("animationend", function() {
					curr.removeClass("cs-current");
				});

				var next = this.$slides.eq(currIndex + 1);
				next.addClass("cs-current");
				this.currentSlide++;
			}
		},

		prevSlide: function() {
			var currIndex = this.currentSlide;
			var curr = this.$slides.eq(currIndex);

			if(currIndex - 1 >= 0) {
				curr.removeClass("cs-current");

				var prev = this.$slides.eq(currIndex - 1);

				prev.css({
					transform: "translateX(-100%) scale(0.7)"
				});

				prev.removeClass("cs-left");
				prev.addClass("cs-current");

				prev.one("animationend", function() {
					prev.css({
						transform: ""
					});
				});

				this.currentSlide--;

			}
		}
	};

	app.init();
});
