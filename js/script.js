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
		$subForm: $("#sub-form"),

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

			this.$sideNav.find(".nav-contents li:not(:last-child) a").click(function(e) {
				e.preventDefault();
				var id = e.target.href.split('#')[1];
				console.log(id);
				if($("#" + id).length !== 0)
					self.scrollToId(id);
			});

			this.registerFormChangeHandlers();

			this.$subForm.on("submit", function(e) {
				e.preventDefault();

				$btn = self.$subForm.find(".cs-button");

				if(self.validateForm()) {
					self.$subForm.find("input, button").each(function() {
						$(this).prop("disabled", true);
					});
					$btn.html('<span class="fa fa-spinner"></span>');

					$.ajax({
						url: self.$subForm.attr("action"),
						method: 'POST',
						dataType: 'json',
						data: {
							'fname': self.$subForm.get(0).fname.value,
							'lname': self.$subForm.get(0).lname.value,
							'email': self.$subForm.get(0).email.value
						}
						})
						.done(function(data) {
							if(data.status === "subscribed") {
								$btn.find(".fa").hide(function() {
									$this.remove();
									$('<span class="fa fa-check"></span>')
										.hide()
										.appendTo($btn)
										.fadeIn();
								});
							}
						})
						.fail(function() {
							console.log("Trouble connecting.");
						});
				}
			});

		},

		validateForm: function() {
			var $fname = this.$subForm.find('[name="fname"]'),
					$lname = this.$subForm.find('[name="lname"]'),
					$email = this.$subForm.find('[name="email"]');

			var isValid = true;

			if(!this.validateName($fname.val())) {
				$fname.next('.fa').removeClass("hide");
				isValid = false;
			} else {
				$fname.next('.fa').addClass("hide");
			}

			if(!this.validateName($lname.val())) {
				$lname.next('.fa').removeClass("hide");
				isValid = false;
			} else {
				$lname.next('.fa').addClass("hide");
			}

			if(!this.validateEmail($email.val())) {
				$email.next('.fa').removeClass("hide");
				isValid = false;
			} else {
				$email.next('.fa').addClass("hide");
			}

			return isValid;
		},

		validateName: function(name) {
			return /^[a-zA-Z]+$/.test(name);
		},

		validateEmail: function(email) {
			return /^[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(email);
		},

		registerFormChangeHandlers: function() {
			var self = this;
			var $errorElement = $('<span class="fa fa-exclamation-circle hide"></span>');
			var $fname = this.$subForm.find('[name="fname"]'),
					$lname = this.$subForm.find('[name="lname"]'),
					$email = this.$subForm.find('[name="email"]');

			$fname.after($errorElement.clone());
			$lname.after($errorElement.clone());
			$email.after($errorElement.clone());

			$fname.change(function() {
				var inp = $(this);
				if(!self.validateName(inp.val())) {
					inp.next('.fa').removeClass("hide");
				} else {
					inp.next('.fa').addClass("hide");
				}
			});

			$lname.change(function() {
				var inp = $(this);
				if(!self.validateName($(this).val())) {
					inp.next('.fa').removeClass("hide");
				} else {
					inp.next('.fa').addClass("hide");
				}
			});

			$email.change(function() {
				var inp = $(this);
				if(!self.validateEmail($(this).val())) {
					inp.next('.fa').removeClass("hide");
				} else {
					inp.next('.fa').addClass("hide");
				}
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
			$(".hamburger").toggleClass("hb-close");
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
			$(".hamburger").removeClass("hb-close");
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
		},

		scrollToId: function(id) {
			var elem = $("#" + id);
			console.log(elem);
			var top = elem.offset().top;
			console.log(top);
			$("body").animate({
				scrollTop: top
			}, 500);
			this.toggleSideNav();
		}
	};

	app.init();

	/**
	 * Canvas animation: Canvas Color Smoke
	 * A pen by Jack Rugile
	 * http://codepen.io/jackrugile/pen/hgdzl
	 */

	(function() {
	  var Blip, blips, c, ch, clear, ctx, cw, divider, globalTick, initialBlips, pi2, rand, run;

	  c = document.getElementById('cs-bg');

	  ctx = c.getContext('2d');

	  divider = 4;

	  cw = c.width = window.innerWidth / divider;

	  ch = c.height = window.innerHeight / divider;

	  pi2 = Math.PI * 2;

	  blips = [];

	  initialBlips = 30;

	  globalTick = 0;

	  rand = function(min, max) {
	    return Math.floor((Math.random() * (max - min + 1)) + min);
	  };

	  Blip = function(x, y) {
	    this.x = x;
	    this.y = y;
	    this.r = 0.1;
	    this.rGrowthBase = 1;
	    this.rGrowth = this.rGrowthBase;
	    this.rMax = (cw + ch) / 7;
	    return (this.alpha = 1);
	  };

	  Blip.prototype.update = function(i) {
	    var percent;
	    percent = (this.rMax - this.r) / this.rMax;
	    this.rGrowth = 0.1 + this.rGrowthBase * percent;
	    this.r += this.rGrowth;
	    this.alpha = percent;
	    if (this.r > this.rMax) {
	      return blips.splice(i, 1);
	    }
	  };

	  Blip.prototype.render = function(i) {
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.r, 0, pi2, false);
	    ctx.fillStyle = 'hsla(' + rand(globalTick - 80, globalTick + 80) + ', 50%, 0.4%, ' + this.alpha + ')';
	    return ctx.fill();
	  };

	  clear = function() {
	    ctx.globalCompositeOperation = 'destination-out';
	    ctx.fillStyle = 'hsla(0, 0%, 0%, .05)';
	    ctx.fillRect(0, 0, cw, ch);
	    return (ctx.globalCompositeOperation = 'lighter');
	  };

	  run = function() {
	    var i;
	    window.requestAnimationFrame(run, c);
	    clear();
	    i = blips.length;
	    while (i--) {
	      blips[i].update(i);
	    }
	    i = blips.length;
	    while (i--) {
	      blips[i].render(i);
	    }
	    blips.push(new Blip(rand(0, cw), rand(0, ch)));
	    return globalTick++;
	  };

	  $(window).on('resize', function() {
	    cw = c.width = window.innerWidth / divider;
	    return (ch = c.height = window.innerHeight / divider);
	  });

	  window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
	    return window.setTimeout(function() {
	      return callback(+new Date());
	    }, 1000 / 60);
	  });

	  run();

	}).call(this);
});
