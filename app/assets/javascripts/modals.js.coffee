# This file should be "required" into your `application.js` via the Asset Pipeline.
#
$ ->
  $modal = $('#modal')
  $modal_close = $modal.find('.close')
  $modal_container = $('#modal-container')

  # Handle modal links with the data-remote attribute
  $('a[data-remote]').on 'ajax:success', (xhr, data, status) ->
    $modal
    .html(data)
    .prepend($modal_close)
    .css('top', $(window).scrollTop() + 100)
    .show()
    $modal_container.show();

  # close window by clicking 'close'
  $modal.on 'click', '#modal .close', ->
    $modal_container.hide()
    $modal.hide()
    false

  # close window by clicking outside modal
  $modal_container.on 'click', ->
    $modal_container.hide()
    $modal.hide()
    false