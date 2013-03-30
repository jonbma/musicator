var setPixel = function(imageData, x, y, r, g, b) {
	index = (x + y * imageData.width) * 4;
	if(imageData.data[index+3] != 255){
		imageData.data[index+0] = imageData.data[index+1] = imageData.data[index+2] = 255;
	}
	imageData.data[index+0] = Math.min(imageData.data[index+1],r);
	imageData.data[index+1] = Math.min(imageData.data[index+1],g);
	imageData.data[index+2] = Math.min(imageData.data[index+2],b);
	imageData.data[index+3] = 255;
}

var copyImageData = function (ctx, src){
	var dst = ctx.createImageData(src.width, src.height);
	dst.data.set(src.data);
	return dst;
}

var pagesLoaded = 0;
var currentPage = 1;
var editingComment = null;
var npages, pdf_url, annotations = [], my_color;
var handles = [], panes = [], overlays = [], imageData = [], markers = [];

var updatePage = function(c){
	var canvas = handles[c].get(0);
/*	var context = canvas.getContext('2d');
	imageData.push(context.getImageData(0, 0, canvas.width, canvas.height));
	imageDataCopy = copyImageData(context, imageData[c]);*/
	
	$(panes[c]).find(".marker").remove();
	
	for(var ai=0; ai<annotations.length; ++ai){
		if(annotations[ai].pg != c+1) continue;
		/*if(annotations[ai].type == "highlight"){
			var x1 = Math.round(canvas.width*annotations[ai].x1),
				x2 = Math.round(canvas.width*annotations[ai].x2),
				y1 = Math.round(canvas.height*annotations[ai].y1),
				y2 = Math.round(canvas.height*annotations[ai].y2);
			for(var i=x1; i<=x2; ++i){
				for(var j=y1; j<=y2; ++j){
					if(annotations[ai].color == 0)
						setPixel(imageDataCopy, i, j, 255, 220, 220);
					else
						setPixel(imageDataCopy, i, j, 255, 255, 170);
				}
			}
		}*/
		else if(annotations[ai].type == "comment"){
			x = annotations[ai].x * canvas.width;
			y = annotations[ai].y * canvas.height;
			var marker = $("<div class='marker tooltip'/>").addClass('marker-color-' + annotations[ai].color).offset({left:x, top:y}).appendTo(overlays[c]).attr("title", annotations[ai].content).tooltipster({theme: 'tooltip-theme-' + annotations[ai].color, updateAnimation: false});
			var edit = $("<div/>").data("marker", marker).tooltipster({content: "<textarea class='edit-comment'></textarea>", theme: 'tooltip-theme-' + my_color, interactive: true,
interactiveTolerance: 5000, trigger: "click",
					functionReady: function(origin, tooltip){
						editingComment = $(origin);
						var ta = $(tooltip).find("textarea");
						ta.val( annotations[$(origin).data("marker").data("index")].content ).focus().select().
						keyup( function(obj,a){return function(){ $(obj).data("content", a.val() );};}(origin,ta) );
					},
					functionAfter: function(origin){
						editingComment = null;
						var ct = $.trim($(origin).data("content"));
						$(origin).tooltipster("disable").data("marker").tooltipster( "update", ct ).tooltipster("enable");
						annotations[$(origin).data("marker").data("index")].content = ct;
					}
				} ).tooltipster("disable").appendTo(marker);
			marker.data("edit", edit);
			if(my_color == annotations[ai].color) marker.addClass('hover-hand').data("index", ai).click(function(e){
				$(e.target).tooltipster("disable");
				$(e.target).data("edit").tooltipster("enable").click();
			});
			markers[ai] = marker;
		}
	}
//	context.putImageData(imageDataCopy,0,0);
}

var initPDF = function(pdf_url_, my_color_, annotations_){
	PDFJS.disableWorker = true;
	
	my_color = my_color_;
	pdf_url = pdf_url_;
	annotations = annotations_;

	renderPage = function (pdf, the_page, canvas){
		pdf.getPage(the_page).then(function(page) {
			var portwidth = page.pageInfo.view[2] - page.pageInfo.view[0];
			var viewport = page.getViewport(  $("#page-container").width()/portwidth);
			var context = canvas.getContext('2d');
			canvas.height = viewport.height;
			canvas.width = viewport.width;

			page.render( { canvasContext: context, viewport: viewport } ).then(
				function(x){
					++pagesLoaded;
					if(pagesLoaded == npages){
						console.log("pages done loading");
						panes[0].show();
						for(var i=0; i<npages; ++i) updatePage(i);
						$("#page-wrapper").nanoScroller();
					}
				}
			)
		});
    }
/*
    PDFJS.getDocument(pdf_url).then(
		function getDocumentCallback(pdf){
			var cont = $("#page-container");
			npages = pdf.pdfInfo.numPages;
			for(var i=1; i<=npages; ++i){
				var canvas = $("<canvas class = 'page-display'/>");
				canvas.click(function(e){
					if(editingComment != null){
						editingComment.click();
						
						return false;
					}
					var X = (e.offsetX - 8) /e.target.clientWidth,
						Y = (e.offsetY - 8)  /e.target.clientHeight;
					annotations.push({ type: "comment",
						color: my_color,
						pg: currentPage,
						x: X,
						y: Y,
						content: "" });
					updatePage(currentPage-1);
					markers[annotations.length-1].tooltipster("disable").data("edit").tooltipster("enable").click();
				});
				handles.push(canvas);
				panes.push( $("<div class='page-pane'/>").append(canvas).appendTo(cont) );
				overlays.push( $("<div class='overlay'/>").appendTo(panes[i-1]) );
			}

			for(var i=1; i<=npages; ++i){
				renderPage(pdf, i, handles[i-1].get()[0]);
			}
		}
	);
*/

	var changePage = function(pagenum){
		if(pagenum > npages || 1 > pagenum){
			return;
		}

		panes[currentPage-1].hide();
		panes[pagenum-1].show();
		currentPage = pagenum;
		$("#page-num").val(pagenum);
		$("#page-wrapper").nanoScroller({scroll: "top"});
	}
	
	npages = 12;
	var cont = $("#page-container");
	for(var i=1; i<=npages; ++i){
		var canvas = $("<img class = 'page-display'/>").attr("src", "/bullshit/chopin-"+(i-1)+".png");
		canvas.click(function(e){
			if(editingComment != null){
				editingComment.click();
				
				return false;
			}
			var X = (e.offsetX - 8) /e.target.clientWidth,
				Y = (e.offsetY - 8) /e.target.clientHeight;
			annotations.push({ type: "comment",
				color: my_color,
				pg: currentPage,
				x: X,
				y: Y,
				content: "" });
			updatePage(currentPage-1);
			markers[annotations.length-1].tooltipster("disable").data("edit").tooltipster("enable").click();
		});
		handles.push(canvas);
		panes.push( $("<div class='page-pane'/>").append(canvas).appendTo(cont) );
		overlays.push( $("<div class='overlay'/>").appendTo(panes[i-1]) );
	}
	
	for(var i=1; i<=npages; ++i) updatePage(i-1);
	
	$("#page-wrapper").nanoScroller();
	changePage(1);

	$("#fwd-button").click(function(){
		changePage(currentPage + 1);
	});

	$("#back-button").click(function(){
		changePage(currentPage - 1);
	});
	
	$(window).load( function(){
			for(var i=1; i<=npages; ++i) updatePage(i-1);
		}
	);
}


