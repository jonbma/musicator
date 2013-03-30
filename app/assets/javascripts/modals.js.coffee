$ ->
  $modal = $('#modal')
  $modal_header = $modal.find('.modal-header')
  $modal_body = $modal.find('.modal-body')
  $modal_close = $modal.find('.close')

  # Handle modal links with the data-remote attribute
  $('a[data-remote]').on 'ajax:success', (xhr, data, status) ->
    components = data.replace('</h1>', '<h1>').split('<h1>')
    header = components[1]
    body = components[2]
    $modal_header.html(header).prepend($modal_close)
    $modal_body.html(body)
    $modal.modal('show') ;


