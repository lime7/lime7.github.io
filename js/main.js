'use strict';

$(document).ready(function(){    

    // Sticky Header
    function navbarFixed(){
        if($('.page-header').length){
            $(window).scroll(function(){
                var scroll = $(window).scrollTop();

                if (scroll > 100 ){
                    $('.page-header').addClass("sticky");
                } else {
                    $('.page-header').removeClass("sticky");
                }
            });
        }
    }
    navbarFixed();

	/*-----------------------------------------------------------------*/
    /*  PLUGINS */
    /*-----------------------------------------------------------------*/

    //Select2
    if($('.js-select').length){
        $('.js-select').select2({
            // closeOnSelect : false,
            // allowHtml: true,
            // allowClear: true,
            width: 'auto',
            placeholder: function(){
                $(this).data('placeholder');
            }
        });
    }
    
    // Fancybox
    $('[data-fancybox]').fancybox({
        touch: false
    });    
      
    
    
    // Phone Mask
    $('.js-phone').mask("+7(999)999-9999");
    
    // Slick Slider
    if($('.slider').length){
        $('.slider').each(function(){

            var $this = $(this);

            $this.slick({
                slidesToShow: 3,
                slidesToScroll: 1,               
                dots: true,
                infinite: true,
                touchMove: true,
                draggable:true,
                lazyLoad: 'ondemand',
                prevArrow:'<button class="slick-prev"></button>',
                nextArrow:'<button class="slick-next"></button>',
                autoplay: true,
                autoplaySpeed: 8000,
                easing: 'swing', 
                // centerMode: true,
                // variableWidth: true,
                responsive: [                        
                    {
                      breakpoint: 992,
                      settings: {
                        slidesToShow: 2,
                      }
                    },
                    {
                      breakpoint: 520,
                      settings: {
                        slidesToShow: 1,
                      }
                    }
                ]
            });   

        }); 
    } 


    // Wow animation
    if($('.wow').length){
        function wowAnimation(){
            new WOW({
                offset: 100,          
                mobile: false
            }).init()
        }
        wowAnimation();
    }
    

    // Page scroll to ID
    if($(".m_PageScroll2id").length){
        $(".m_PageScroll2id").mPageScroll2id();
    } 
    
    // ConterTo
    // if($('.timer').length){
    //     $('.timer').countTo();
    // }

    function animateCountTo(ct) {
        $(ct).countTo({
            // speed: 1000,
            // refreshInterval: 1
        });
    }

    function initCountTo() {
        var counter = $('.timer');
        counter.each(function() {
            animateCountTo(this);
        });
    }

    //initCountTo();

    function isScrolledIntoView(el) {
        var elemTop = el.offset().top;
        var elemBottom = el.offset().top + el.height();        

        var isVisible = (elemTop > $(window).scrollTop()) && (elemBottom < ($(window).scrollTop() + $(window).height()));
        return isVisible;
    }

    $(window).on('scroll', function () {

        if (isScrolledIntoView($('#counters'))) {
            console.log('scroll to count');
            initCountTo();


            $(window).off('scroll');
        }        
    });


    /*=========== Callback ===========*/
    (function() {

        var app = {

            init: function() {
                this.setUpListeners();
            },

            setUpListeners: function() {

                $(document).on('submit', 'form', this.submitForm);
                $(document).on('keyup', 'input', this.removeError);
            },

            submitForm: function(e) {
                e.preventDefault();
                var form = $(this),
                    btnSubmit = form.find('[type="submit"]'),
                    defForm = $('.form')

                if (form.validate().form() === false) {
                    btnSubmit.addClass('disabled');
                    return false;
                } else {
                    btnSubmit.removeClass('disabled');
                }              
                


                var str = form.serialize();

                var sc = $('#success-form');

                $.ajax({
                    url: 'contacts.php',
                    type: 'post',
                    data: str + document.location.search.replace('?', '&')
                }).done(function(msg) {

                    if (msg === "OK") {

                        setTimeout(function() {
                            $.fancybox.close();
                        }, 1000);


                        if (typeof form[0].reset == "function") {
                            form[0].reset();
                        } else {
                            form[0].reset.click();
                        }                        

                        $.fancybox.open({
                            src: sc,
                            type: 'inline',
                        });

                    } else {

                        $.fancybox.open({
                            src: sc,
                            type: 'inline',
                        });

                    }

                }).always(function() {

                });
            },

            removeError: function() {
                var $this = $(this),
                          formGroup = $this.closest('.form-group'),
                          form = $(this).closest('form'),
                          btnSubmit = form.find('[type="submit"]');
                      
                      
                if ($this.valid()){
                  btnSubmit.removeClass('disabled');  
                } else {
                  btnSubmit.addClass('disabled'); 
                }
            }
        }

        app.init();
    })();

});



$(window).on('load', function(){

    // function loader(){
        
    //     $('#preloader').addClass('loaded');

    //     if ($('#preloader').hasClass('loaded')) {
            
    //         $('#preloader').delay(900).queue(function () {
    //             $(this).remove();
    //         });
    //     }
        
    // }
    // loader();

    // Masinry
    // function gridMasonry(){
    //     var grid = $(".grid")

    //     grid.masonry({
    //         itemSelector: '.grid-item',
    //         //columnWidth: '.grid-sizer',
    //         //percentPosition: true,
    //         layoutMode: 'fitRows',
    //         //transitionDuration: '0.1s',
    //         //gutter: 15
    //     });
    // }
    // gridMasonry();

    function gridMasonry(){
        var grid = $(".grid")
        if( grid.length ){
            // grid.imagesLoaded( function() {
            //     grid.isotope({
            //         itemSelector: '.grid-item',
            //         percentPosition: true,
            //         layoutMode: 'masonry',
            //         // masonry: {
            //         //     columnWidth: '.grid-sizer'
            //         //   }
            //     });
            // })

            grid.isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                layoutMode: 'masonry',
                // masonry: {
                //     columnWidth: '.grid-sizer'
                //   }
            });
        }
    }
    gridMasonry();


    // Custom Scrollbar
    if($(".mCustomScrollbar").length){
        $(".mCustomScrollbar").mCustomScrollbar({
            theme:"minimal",
            scrollbarPosition: 'outside'
        });
    }
});

// var $window = $(window);
// if($(window).width() > 576){
//     $window.on('load resize', function(){
//          console.log('load resize');
//     });
// }