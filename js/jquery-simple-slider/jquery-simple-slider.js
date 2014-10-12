function SimpleSlider(slider, cfg){
    this._timer = null;
    this._index = 0;
    this._config = {
        width: 400,
        height: 300,
        duration: 5000,
        autoPlay: true,
        hasControl: true,
        hasTurnPageBtn: true,

        //TODO: fade ease explosion etc...
        effect : null,

        //TODO: endless transform
        endless: false
    };
    this.slider = slider;
    this.sliderList = $(".simple-slider-list", slider);
    this.sliderListItems = $(".simple-slider-list-item", this.sliderList); 
    this.sliderPrev = $(".simple-slider-prev", this.slider);
    this.sliderNext = $(".simple-slider-next", this.slider);
    this.config = $.extend(this._config, cfg);
    if(this.config.hasControl){
        this.sliderControl = $("<ul></ul>").addClass("simple-slider-control");
    }
    this.sliderListItemWidth = this.config.width;
    this.init();
};

SimpleSlider.prototype = {
    moveTo :  function (index){
        this.sliderList.stop().animate({ "left" : -index * this.sliderListItemWidth });
        if(this.config.hasControl){
            this.sliderControlItems.removeClass("active");
            this.sliderControlItems.eq(this._index).addClass("active");
        }
    },
    moveLeft : function (){
        this._index--;
        if (this._index < 0 ){
            this._index = this.sliderListItems.length-1;
        }
        this.moveTo(this._index);
    },
    moveRight : function (){
        this._index++;
        if(this._index >= this.sliderListItems.length){
            this._index = 0;
        }
        this.moveTo(this._index);
    },
    render : function (){

        //reset slider width & height
        this.slider.css({"width": this.config.width, "height": this.config.height});

        //set list width
        this.sliderList.css({"width" : this.sliderListItems.length * this.sliderListItemWidth });

        //set list items width & height
        this.sliderListItems.css({ width: this.config.width, height : this.config.height });

        //build control item
        if(this.config.hasControl){
            for ( var i=0; i < this.sliderListItems.length; i++){
                var newControlItem = $("<li></li>");
                newControlItem.addClass("simple-slider-control-item").html( i+1 );
                if( i == 0){
                    newControlItem.addClass("active");
                }
                this.sliderControl.append(newControlItem);
            }
            this.sliderControlItems = $(".simple-slider-control-item", this.sliderControl);
            this.bind();
            this.slider.append(this.sliderControl);
        }
        
    },
    bind : function (){

        //SimpleSlider Object
        var _this = this;
        this.sliderControlItems.bind("click", function(){

            //current clicked Object
            var __this = $(this);
            _this._index = __this.index();
            _this.moveTo(_this._index);
        });
    },
    autoPlay : function(){

        //SimpleSlider Object
        var _this = this;
        _this._timer = setInterval(function(){
            _this.moveRight();
        }, _this.config.duration);
    },
    stopAutoPlay : function (){

        //SimpleSlider Object
        var _this = this;
        clearInterval(_this._timer);
    },
    init : function(){

        //SimpleSlider Object
        var _this = this;
        _this.render();

        //check page button config: true? show & bind : hide
        if( _this.config.hasTurnPageBtn){
            _this.sliderPrev.show();
            _this.sliderNext.show();

            //bind page button event
            _this.sliderPrev.bind("click", function(){
                _this.moveLeft();
            });
            _this.sliderNext.bind("click", function(){
                _this.moveRight();
            });
        }
        else{
            _this.sliderPrev.hide();
            _this.sliderNext.hide();
        }

        //check autoPlay config
        if( _this.config.autoPlay ){
            _this.autoPlay();

            //bind hover event
            _this.slider.hover(function(){
                _this.stopAutoPlay();
            }, function(){
                _this.autoPlay();
            });
        }

       /* //check control config
        if( _this.config.hasControl ){
            _this.sliderControl.show();
            _this.bind();
        }
        else{
            _this.sliderControl.hide();
        }*/
    }
};