
(function(a){if(!a.omr){a.omr=new Object()}a.omr.totemticker=function(c,b){var d=this;d.el=c;d.$el=a(c);d.$el.data("omr.totemticker",d);d.init=function(){d.options=a.extend({},a.omr.totemticker.defaultOptions,b);d.ticker;d.format_ticker();d.setup_nav();d.start_interval()};d.start_interval=function(){clearInterval(d.ticker);d.ticker=setInterval(function(){d.$el.find("li:first").animate({marginTop:"-"+d.options.row_height,},d.options.speed,function(){a(this).detach().css("marginTop","0").appendTo(d.$el)})},d.options.interval)};d.reset_interval=function(){clearInterval(d.ticker);d.start_interval()};d.stop_interval=function(){clearInterval(d.ticker)};d.format_ticker=function(){if(typeof(d.options.max_items)!="undefined"&&d.options.max_items!=null){var f=d.options.row_height.replace(/px/i,"");var e=f*d.options.max_items;d.$el.css({height:e+"px",overflow:"hidden",})}else{d.$el.css({overflow:"hidden",})}};d.setup_nav=function(){if(typeof(d.options.stop)!="undefined"&&d.options.stop!=null){a(d.options.stop).click(function(){d.stop_interval();return false})}if(typeof(d.options.start)!="undefined"&&d.options.start!=null){a(d.options.start).click(function(){d.start_interval();return false})}if(typeof(d.options.previous)!="undefined"&&d.options.previous!=null){a(d.options.previous).click(function(){d.$el.find("li:last").detach().prependTo(d.$el).css("marginTop","-"+d.options.row_height);d.$el.find("li:first").animate({marginTop:"0px",},d.options.speed,function(){d.reset_interval()});return false})}if(typeof(d.options.next)!="undefined"&&d.options.next!=null){a(d.options.next).click(function(){d.$el.find("li:first").animate({marginTop:"-"+d.options.row_height,},d.options.speed,function(){a(this).detach().css("marginTop","0px").appendTo(d.$el);d.reset_interval()});return false})}if(typeof(d.options.mousestop)!="undefined"&&d.options.mousestop===true){d.$el.mouseenter(function(){d.stop_interval()}).mouseleave(function(){d.start_interval()})}};d.debug_info=function(){console.log(d.options)};d.init()};a.omr.totemticker.defaultOptions={message:"Ticker Loaded",next:null,previous:null,stop:null,start:null,row_height:"100px",speed:800,interval:4000,max_items:null,};a.fn.totemticker=function(b){return this.each(function(){(new a.omr.totemticker(this,b))})}})(jQuery);
//////////////////////////////////////////////////////////////
// select
/////////////////////////////////////////////////////////////
(function(a){a.uniform={options:{selectClass:"selector",radioClass:"radio",checkboxClass:"checker",fileClass:"uploader",filenameClass:"filename",fileBtnClass:"action",fileDefaultText:"No file selected",fileBtnText:"Choose File",checkedClass:"checked",focusClass:"focus",disabledClass:"disabled",buttonClass:"button",activeClass:"active",hoverClass:"hover",useID:true,idPrefix:"uniform",resetSelector:false,autoHide:true},elements:[]};if(a.browser.msie&&a.browser.version<7){a.support.selectOpacity=false}else{a.support.selectOpacity=true}a.fn.uniform=function(k){k=a.extend(a.uniform.options,k);var d=this;if(k.resetSelector!=false){a(k.resetSelector).mouseup(function(){function l(){a.uniform.update(d)}setTimeout(l,10)})}function j(l){$el=a(l);$el.addClass($el.attr("type"));b(l)}function g(l){a(l).addClass("uniform");b(l)}function i(o){var m=a(o);var p=a("<div>"),l=a("<span>");p.addClass(k.buttonClass);if(k.useID&&m.attr("id")!=""){p.attr("id",k.idPrefix+"-"+m.attr("id"))}var n;if(m.is("a")||m.is("button")){n=m.text()}else{if(m.is(":submit")||m.is(":reset")||m.is("input[type=button]")){n=m.attr("value")}}n=n==""?m.is(":reset")?"Reset":"Submit":n;l.html(n);m.css("opacity",0);m.wrap(p);m.wrap(l);p=m.closest("div");l=m.closest("span");if(m.is(":disabled")){p.addClass(k.disabledClass)}p.bind({"mouseenter.uniform":function(){p.addClass(k.hoverClass)},"mouseleave.uniform":function(){p.removeClass(k.hoverClass);p.removeClass(k.activeClass)},"mousedown.uniform touchbegin.uniform":function(){p.addClass(k.activeClass)},"mouseup.uniform touchend.uniform":function(){p.removeClass(k.activeClass)},"click.uniform touchend.uniform":function(r){if(a(r.target).is("span")||a(r.target).is("div")){if(o[0].dispatchEvent){var q=document.createEvent("MouseEvents");q.initEvent("click",true,true);o[0].dispatchEvent(q)}else{o[0].click()}}}});o.bind({"focus.uniform":function(){p.addClass(k.focusClass)},"blur.uniform":function(){p.removeClass(k.focusClass)}});a.uniform.noSelect(p);b(o)}function e(o){var m=a(o);var p=a("<div />"),l=a("<span />");if(!m.css("display")=="none"&&k.autoHide){p.hide()}p.addClass(k.selectClass);if(k.useID&&o.attr("id")!=""){p.attr("id",k.idPrefix+"-"+o.attr("id"))}var n=o.find(":selected:first");if(n.length==0){n=o.find("option:first")}l.html(n.html());o.css("opacity",0);o.wrap(p);o.before(l);p=o.parent("div");l=o.siblings("span");o.bind({"change.uniform":function(){l.text(o.find(":selected").html());p.removeClass(k.activeClass)},"focus.uniform":function(){p.addClass(k.focusClass)},"blur.uniform":function(){p.removeClass(k.focusClass);p.removeClass(k.activeClass)},"mousedown.uniform touchbegin.uniform":function(){p.addClass(k.activeClass)},"mouseup.uniform touchend.uniform":function(){p.removeClass(k.activeClass)},"click.uniform touchend.uniform":function(){p.removeClass(k.activeClass)},"mouseenter.uniform":function(){p.addClass(k.hoverClass)},"mouseleave.uniform":function(){p.removeClass(k.hoverClass);p.removeClass(k.activeClass)},"keyup.uniform":function(){l.text(o.find(":selected").html())}});if(a(o).attr("disabled")){p.addClass(k.disabledClass)}a.uniform.noSelect(l);b(o)}function f(n){var m=a(n);var o=a("<div />"),l=a("<span />");if(!m.css("display")=="none"&&k.autoHide){o.hide()}o.addClass(k.checkboxClass);if(k.useID&&n.attr("id")!=""){o.attr("id",k.idPrefix+"-"+n.attr("id"))}a(n).wrap(o);a(n).wrap(l);l=n.parent();o=l.parent();a(n).css("opacity",0).bind({"focus.uniform":function(){o.addClass(k.focusClass)},"blur.uniform":function(){o.removeClass(k.focusClass)},"click.uniform touchend.uniform":function(){if(!a(n).attr("checked")){l.removeClass(k.checkedClass)}else{l.addClass(k.checkedClass)}},"mousedown.uniform touchbegin.uniform":function(){o.addClass(k.activeClass)},"mouseup.uniform touchend.uniform":function(){o.removeClass(k.activeClass)},"mouseenter.uniform":function(){o.addClass(k.hoverClass)},"mouseleave.uniform":function(){o.removeClass(k.hoverClass);o.removeClass(k.activeClass)}});if(a(n).attr("checked")){l.addClass(k.checkedClass)}if(a(n).attr("disabled")){o.addClass(k.disabledClass)}b(n)}function c(n){var m=a(n);var o=a("<div />"),l=a("<span />");if(!m.css("display")=="none"&&k.autoHide){o.hide()}o.addClass(k.radioClass);if(k.useID&&n.attr("id")!=""){o.attr("id",k.idPrefix+"-"+n.attr("id"))}a(n).wrap(o);a(n).wrap(l);l=n.parent();o=l.parent();a(n).css("opacity",0).bind({"focus.uniform":function(){o.addClass(k.focusClass)},"blur.uniform":function(){o.removeClass(k.focusClass)},"click.uniform touchend.uniform":function(){if(!a(n).attr("checked")){l.removeClass(k.checkedClass)}else{var p=k.radioClass.split(" ")[0];a("."+p+" span."+k.checkedClass+":has([name='"+a(n).attr("name")+"'])").removeClass(k.checkedClass);l.addClass(k.checkedClass)}},"mousedown.uniform touchend.uniform":function(){if(!a(n).is(":disabled")){o.addClass(k.activeClass)}},"mouseup.uniform touchbegin.uniform":function(){o.removeClass(k.activeClass)},"mouseenter.uniform touchend.uniform":function(){o.addClass(k.hoverClass)},"mouseleave.uniform":function(){o.removeClass(k.hoverClass);o.removeClass(k.activeClass)}});if(a(n).attr("checked")){l.addClass(k.checkedClass)}if(a(n).attr("disabled")){o.addClass(k.disabledClass)}b(n)}function h(q){var o=a(q);var r=a("<div />"),p=a("<span>"+k.fileDefaultText+"</span>"),m=a("<span>"+k.fileBtnText+"</span>");if(!o.css("display")=="none"&&k.autoHide){r.hide()}r.addClass(k.fileClass);p.addClass(k.filenameClass);m.addClass(k.fileBtnClass);if(k.useID&&o.attr("id")!=""){r.attr("id",k.idPrefix+"-"+o.attr("id"))}o.wrap(r);o.after(m);o.after(p);r=o.closest("div");p=o.siblings("."+k.filenameClass);m=o.siblings("."+k.fileBtnClass);if(!o.attr("size")){var l=r.width();o.attr("size",l/10)}var n=function(){var s=o.val();if(s===""){s=k.fileDefaultText}else{s=s.split(/[\/\\]+/);s=s[(s.length-1)]}p.text(s)};n();o.css("opacity",0).bind({"focus.uniform":function(){r.addClass(k.focusClass)},"blur.uniform":function(){r.removeClass(k.focusClass)},"mousedown.uniform":function(){if(!a(q).is(":disabled")){r.addClass(k.activeClass)}},"mouseup.uniform":function(){r.removeClass(k.activeClass)},"mouseenter.uniform":function(){r.addClass(k.hoverClass)},"mouseleave.uniform":function(){r.removeClass(k.hoverClass);r.removeClass(k.activeClass)}});if(a.browser.msie){o.bind("click.uniform.ie7",function(){setTimeout(n,0)})}else{o.bind("change.uniform",n)}if(o.attr("disabled")){r.addClass(k.disabledClass)}a.uniform.noSelect(p);a.uniform.noSelect(m);b(q)}a.uniform.restore=function(l){if(l==undefined){l=a(a.uniform.elements)}a(l).each(function(){if(a(this).is(":checkbox")){a(this).unwrap().unwrap()}else{if(a(this).is("select")){a(this).siblings("span").remove();a(this).unwrap()}else{if(a(this).is(":radio")){a(this).unwrap().unwrap()}else{if(a(this).is(":file")){a(this).siblings("span").remove();a(this).unwrap()}else{if(a(this).is("button, :submit, :reset, a, input[type='button']")){a(this).unwrap().unwrap()}}}}}a(this).unbind(".uniform");a(this).css("opacity","1");var m=a.inArray(a(l),a.uniform.elements);a.uniform.elements.splice(m,1)})};function b(l){l=a(l).get();if(l.length>1){a.each(l,function(m,n){a.uniform.elements.push(n)})}else{a.uniform.elements.push(l)}}a.uniform.noSelect=function(l){function m(){return false}a(l).each(function(){this.onselectstart=this.ondragstart=m;a(this).mousedown(m).css({MozUserSelect:"none"})})};a.uniform.update=function(l){if(l==undefined){l=a(a.uniform.elements)}l=a(l);l.each(function(){var n=a(this);if(n.is("select")){var m=n.siblings("span");var p=n.parent("div");p.removeClass(k.hoverClass+" "+k.focusClass+" "+k.activeClass);m.html(n.find(":selected").html());if(n.is(":disabled")){p.addClass(k.disabledClass)}else{p.removeClass(k.disabledClass)}}else{if(n.is(":checkbox")){var m=n.closest("span");var p=n.closest("div");p.removeClass(k.hoverClass+" "+k.focusClass+" "+k.activeClass);m.removeClass(k.checkedClass);if(n.is(":checked")){m.addClass(k.checkedClass)}if(n.is(":disabled")){p.addClass(k.disabledClass)}else{p.removeClass(k.disabledClass)}}else{if(n.is(":radio")){var m=n.closest("span");var p=n.closest("div");p.removeClass(k.hoverClass+" "+k.focusClass+" "+k.activeClass);m.removeClass(k.checkedClass);if(n.is(":checked")){m.addClass(k.checkedClass)}if(n.is(":disabled")){p.addClass(k.disabledClass)}else{p.removeClass(k.disabledClass)}}else{if(n.is(":file")){var p=n.parent("div");var o=n.siblings(k.filenameClass);btnTag=n.siblings(k.fileBtnClass);p.removeClass(k.hoverClass+" "+k.focusClass+" "+k.activeClass);o.text(n.val());if(n.is(":disabled")){p.addClass(k.disabledClass)}else{p.removeClass(k.disabledClass)}}else{if(n.is(":submit")||n.is(":reset")||n.is("button")||n.is("a")||l.is("input[type=button]")){var p=n.closest("div");p.removeClass(k.hoverClass+" "+k.focusClass+" "+k.activeClass);if(n.is(":disabled")){p.addClass(k.disabledClass)}else{p.removeClass(k.disabledClass)}}}}}}})};return this.each(function(){if(a.support.selectOpacity){var l=a(this);if(l.is("select")){if(l.attr("multiple")!=true){if(l.attr("size")==undefined||l.attr("size")<=1){e(l)}}}else{if(l.is(":checkbox")){f(l)}else{if(l.is(":radio")){c(l)}else{if(l.is(":file")){h(l)}else{if(l.is(":text, :password, input[type='email']")){j(l)}else{if(l.is("textarea")){g(l)}else{if(l.is("a")||l.is(":submit")||l.is(":reset")||l.is("button")||l.is("input[type=button]")){i(l)}}}}}}}}})}})(jQuery);

// jQuery("select").uniform();
jQuery('.listticker').totemticker({
								  max_items   :  3,
				row_height	:	'90px',
				next		:	'#ticker-next',
				previous	:	'#ticker-previous',
				stop		:	'#stop',
				start		:	'#start',
				mousestop	:	true,
			});

//////////////////////////////////////////////////////////////
// Set Variables
/////////////////////////////////////////////////////////////

var transitionSpeed = 500;
var scrollSpeed = 700;
var fadeDelay = 100;
var currentProject = "";
var nextProject = "";
var previousHeight = "";
var emptyProjectBoxHeight = 100;
var hasSlideshow = false;
	
// /////////////////////////////
// iPad and iPod Detection
// /////////////////////////////
	
function isiPad(){
    return (navigator.platform.indexOf("iPad") != -1);
}

function isiPhone(){
    return (
        // Detect iPhone
        (navigator.platform.indexOf("iPhone") != -1) || 
        // Detect iPod
        (navigator.platform.indexOf("iPod") != -1)
    );
}







// /////////////////////////////
// Isotope Browser Check
// /////////////////////////////

function isotopeAnimationEngine(){
	if(jQuery.browser.mozilla){
		return "jquery";
	}else{
		return "css";
	}
}


// /////////////////////////////
// Lightbox
// /////////////////////////////

function lightboxInit() {
	jQuery("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false,
		deeplinking: false
	});
}


// /////////////////////////////
// Project Filtering
// /////////////////////////////

function projectFilterInit() {
	jQuery('#filterNav a').click(function(){
		var selector = jQuery(this).attr('data-filter');	
		jQuery('#projects .thumbs').isotope({
			filter: selector,			
			hiddenStyle : {
		    	opacity: 0,
		    	scale : 1
			}			
		});
	
		if ( !jQuery(this).hasClass('selected') ) {
			jQuery(this).parents('#filterNav').find('.selected').removeClass('selected');
			jQuery(this).addClass('selected');
		}
		
	// RUI scroll e fecha projecto
	// jQuery.scrollTo(0, scrollSpeed);
	//jQuery.scrollTo("#nav", scrollSpeed, {offset: 5});
	jQuery('body,html').animate({scrollTop: 200}, 800);
	jQuery(".thumbs .selected").removeClass("selected");	
		processProject();
		document.location.hash = "#";
		jQuery(".thumbs .selected").removeClass("selected");
		return false;
	});	
}


// /////////////////////////////
// Project thumbs
// /////////////////////////////

function projectThumbInit() {
	
	if(!isiPad() && !isiPhone()) {
		jQuery(".project.small, div.sidethumb").hover(
			function() {
				if(!jQuery(this).hasClass("selected")){
					jQuery(this).find('img:last').stop().fadeTo("fast", .9);
				}
					
			},
			function() {
				if(!jQuery(this).hasClass("selected")){
					jQuery(this).find('img:last').stop().fadeTo("fast", 1);
				}	
		});
		
		jQuery(".project.small, div.sidethumb").hover(	
			function() {
				
					jQuery(this).find('.title').stop().fadeTo("fast", .8);
					jQuery(this).find('img:last').attr('title','');
				
			},
			function() {
				if(!jQuery(this).hasClass("selected")){
					jQuery(this).find('.title').stop().fadeTo("fast", .8);
				}				
		});
	}	
	
	
	jQuery('.thumbs.masonry').isotope({
		// options
		itemSelector : '.project.small',
		masonry: {
		   // columnWidth: 120,
		    cornerStampSelector: '#sidebar'
		},
		animationEngine: isotopeAnimationEngine()
	});	
	

	jQuery(".project.small, div.sidethumb").css("opacity", "1");	
	
	jQuery(".project.small, div.sidethumb").click(function(){
		jQuery(".thumbs .selected .title").hide();
		jQuery(".thumbs .selected").find('img:last').stop().fadeTo("fast", 1);	
		jQuery(".thumbs .selected").removeClass("selected");						
		jQuery(this).addClass("selected");		
		jQuery(".thumbs .selected .title").show().fadeTo("fast", .8);
			
		var projectSlug = jQuery(this).attr('id').split('project-')[1];
		//jQuery.scrollTo("#nav", scrollSpeed, {offset: 5});
		jQuery('body,html').animate({scrollTop: 200}, 800);
		processProject(projectSlug);
	});	
	
}
	
	
// /////////////////////////////
// Project Loading
// /////////////////////////////




function processProject(projectSlug) {	
	
	// Prevent projecBox from collapsing
	jQuery("#projectBox").css("height", jQuery("#projectHolder").outerHeight());	
	
	
	
	
	// Fade out the old project
	if(currentProject != "") {			
		jQuery("#projectHolder").fadeOut(transitionSpeed,
			function() {
				jQuery(".project.ajax").remove();
				currentProject = "";						
				if(projectSlug){
					loadProject(projectSlug);
					jQuery("#ajaxLoading").fadeIn('fast');		
					
					
					
				};
			});
	}else{
		// No project currently loaded - open the projectBox to show the loader.
		if(projectSlug){
			jQuery("#homeMessage").removeClass('withBorder');
			jQuery("#pageHead").removeClass('withBorder');
			jQuery("#projectBox").animate({
				height: emptyProjectBoxHeight
			}, scrollSpeed,
			function() {				
				jQuery("#ajaxLoading").fadeIn('fast',
					function() {
						loadProject(projectSlug);		
				});	
			});					
		};
	}	
	
	if(!projectSlug){
		jQuery("#projectBox").animate({
			height: 0
			}, scrollSpeed,
			function() {	
			//jQuery('body,html').animate({scrollTop: 200}, 800);
				jQuery("#homeMessage").addClass('withBorder');
				jQuery("#pageHead").addClass('withBorder');				
			});
							
	}		
}

	
function loadProject(projectSlug) {	
	// margem 30px
	jQuery("#projectBox").toggleClass('margin30');
	// Scroll to the top of the projects
	jQuery('body,html').animate({scrollTop: 200}, 800);
	jQuery("#projectHolder").load(	    
	    MyAjax.ajaxurl,
	    {	        
	        action : 'myajax-submit',	        
	        slug : projectSlug
	    },
	    function( response ) {
	        
	    }
	);
}


function waitForMedia(projectSlug, slideshowDelay) {
	
	var totalMediaElements = 0;
	var loadedMediaElements = 0;
	var mediaTypes = ['img'];
	
	for(var i=0; i<=mediaTypes.length; i++) {
		totalMediaElements += jQuery("#projectHolder " + mediaTypes[i]).length;	
	}
	// alert(totalMediaElements);
	
	if(totalMediaElements > 0){
		for(var i=0; i<=mediaTypes.length; i++) {
			jQuery("#projectHolder " + mediaTypes[i]).each(function() {					
	    		jQuery(this).load(function() {        		
	        		loadedMediaElements++;
	        		if(loadedMediaElements == totalMediaElements) {
						jQuery("#ajaxLoading").fadeOut('fast',
						function(){						
							// Set up the slideshow
				        	jQuery('.flexslider').flexslider({
								slideshowSpeed: slideshowDelay+"000",  
								directionNav: false,					
								animation: "fade" 
							});
							showProject(projectSlug);
						});
	        		}
	    		});
			
			});	
		}
	}else{
		jQuery("#ajaxLoading").fadeOut('fast',
		function(){	       	
			// Fix Vimeo embed for iPad
			if(isiPad()) {				
				jQuery.each(jQuery("iframe"), function() {
					jQuery(this).attr({
						src: jQuery(this).attr("src")
					});
				});
			}			
			showProject(projectSlug);			
		});		
	}	
}

function showProject(projectSlug) {		
	
	// Fade in the new project
	jQuery("#projectHolder").fadeIn(transitionSpeed);	
	currentProject = "project-" + projectSlug;
	jQuery("#" + currentProject).addClass("selected");	
	// Adjust the height of project container
	
	targetHeight = jQuery("#projectHolder").outerHeight();	
	jQuery("#projectHolder").css("height", targetHeight);	
	jQuery("#projectBox").animate({
		height: jQuery("#projectHolder").outerHeight()
	}, scrollSpeed,
	function() {
		jQuery("#projectHolder").css("height", "auto");				
		jQuery("#projectBox").css("height", "auto");		
	});	
	previousHeight = targetHeight;	
	
	jQuery("#projectHolder .closeBtn").click(function(){
		// jQuery(".thumbs .selected .title").hide();
		jQuery(".thumbs .selected").find('img:last').stop().fadeTo("fast", 1);	
		jQuery(".thumbs .selected").removeClass("selected");		
		
		// RUI ao fechar faz scroll para as tags
		// jQuery.scrollTo(0, scrollSpeed);
		jQuery("#projectBox").toggleClass('margin30');
		//jQuery.scrollTo("#nav", scrollSpeed, {offset: 5});
		jQuery('body,html').animate({scrollTop: 200}, 800);

		processProject();
	});
}
	
// click no menu trigger ao scroll



jQuery.noConflict();
jQuery(document).ready(function(){
	lightboxInit();
	projectThumbInit();	
	projectFilterInit();

	jQuery().UItoTop({ easingType: 'easeOutQuart' });
	
	// Show project is there is a hash in the URL
	var projectSlug = location.hash.replace("\#","");	
	if(projectSlug != "index"){
		processProject(projectSlug);
	}	
	
});


window.noloadmorehtml = '';
window.noloadmore = false;
function carregarPosts() {
	if (window.noloadmore)
		return ;
	jQuery(this).addClass("tstMediaLoadMoreLoading");
	window.noloadmore = true;
	window.noloadmorehtml = jQuery("#tstMediaLoadMore").html();

	jQuery("#tstMediaLoadMore").html("加载中...");
	jQuery.post("/image/update", window.Paging , function(response) {

		response = eval("(" + response + ")");
		var len = response.data.length;
		if (len < 1){
			jQuery(window).trigger('ajaxpostloadNoMorePosts');
		}

		for (var i = 0; i < len; i++) {
			_html = "<div id='isotope-item-"+response.data[i]._id+"' class='project small'>";
			_html += "<a rel='bookmark' href='#'></a>";
			_html += "<a href='#'>";
			_html += "<img class='thumb wp-post-image' width='"
					+response.data[i].width+"' height='"
					+response.data[i].height+"' src='/static/uploads/"
					+response.data[i].thumb+"'/>";
			_html += "</a>"
			_html += "<span class='title'><span>"+response.data[i].title+"</span></span>"
			_html += "</div>"
			jQuery('.thumbs.masonry').isotope('insert',jQuery(_html));
		}
		window.Paging.page = response.page
		window.Paging.cat = response.cat;

		jQuery(window).trigger('ajaxpostload');
		 //lightboxInit();
		//projectThumbInit();	
		 //projectFilterInit();
	});
}

// mudar por aqui
jQuery(window).bind('ajaxpostload',function(){
	window.noloadmore = false;
	jQuery("#tstMediaLoadMore").html(window.noloadmorehtml);
	jQuery(this).removeClass("tstMediaLoadMoreLoading");
});
jQuery(window).bind('ajaxpostloadNoMorePosts',function(){
	jQuery("#tstMediaLoadMore").remove();
});

jQuery("#tstMediaLoadMore").click(function(){
	carregarPosts();
});

/*
 * jQuery('.allBtn').click(function(){
 * jQuery.find('.project.selected').forEach(function(i,e){
 * jQuery(i).removeClass('selected'); }); });
 */
