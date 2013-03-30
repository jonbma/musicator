
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
		var npages;
		var handles = [];
		var panes = [], overlays = [];
		var imageData = [];
		var url, annotations;
		
		var updatePage = function(c){
			var canvas = handles[c].get(0);
			var context = canvas.getContext('2d');
			imageData.push(context.getImageData(0, 0, canvas.width, canvas.height));
			imageDataCopy = copyImageData(context, imageData[c]);
			for(var ai=0; ai<annotations.length; ++ai){
				if(annotations[ai].pg != c+1) continue;
				if(annotations[ai].type == "highlight"){
					var x1 = Math.round(canvas.width*annotations[ai].x1),
						x2 = Math.round(canvas.width*annotations[ai].x2),
						y1 = Math.round(canvas.height*annotations[ai].y1),
						y2 = Math.round(canvas.height*annotations[ai].y2);
					for(var i=x1; i<=x2; ++i){
						for(var j=y1; j<=y2; ++j){
							setPixel(imageDataCopy, i, j, 255, 255, 170);
						}
					}
				}
				else if(annotations[ai].type == "comment"){
					x = annotations[ai].x * canvas.width
					y = annotations[ai].y * canvas.height
					$("<div class='marker tooltip'/>").offset({left:x, top:y}).appendTo(overlays[c]).attr("title", annotations[ai].content).tooltipster();
				}
			}
			context.putImageData(imageDataCopy,0,0);
		}
		
		var initPDF = function(url_, annotations_){
			PDFJS.disableWorker = true;
			
			url = url_;
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
		
		    PDFJS.getDocument(url).then(
				function getDocumentCallback(pdf){
					var cont = $("#page-container");
					npages = pdf.pdfInfo.numPages;
					for(var i=1; i<=npages; ++i){
						var canvas = $("<canvas class = 'page-display'/>");
						handles.push(canvas);
						panes.push( $("<div class='page-pane'/>").append(canvas).appendTo(cont) );
						overlays.push( $("<div class='overlay'/>").appendTo(panes[i-1]) );
					}
					
					for(var i=1; i<=npages; ++i){
						renderPage(pdf, i, handles[i-1].get()[0]);
					}
				}
			);
		
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
			
			$("#fwd-button").click(function(){
				changePage(currentPage + 1);
			});
			
			$("#back-button").click(function(){
				changePage(currentPage - 1);
			});
		}
		
