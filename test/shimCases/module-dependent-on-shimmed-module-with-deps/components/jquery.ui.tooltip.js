(function( $, undefined ) {

var text = $.position();

$.tooltip = function () {
  return text === '$.position' ? 'works' : 'does not work';
};

}( jQuery ) );
