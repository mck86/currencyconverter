angular.module('currencyConverter')
	.service('toast', [Toast]);


function Toast() {

	var self = this;
    self.lastToast = null;

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "progressBar": false,
        "positionClass": "toast-bottom-left",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    self.clear = function(toast) {
        if (toast) {
            toastr.clear(toast);
        } else {
            toastr.clear();
        }
    };

    self.clearLast = function() {
        toastr.clear(self.lastToast);
    };

    self.success = function(msg, title) {
        return self._showToast('success', msg, title);
    };

    self.info = function(msg, title) {
        return self._showToast('info', msg, title);
    };

    self.warning = function(msg, title) {
        return self._showToast('warning', msg, title);
    };

    self.error = function(msg, title) {
        return self._showToast('error', msg, title);
    };

    self._showToast = function(type, msg, title) {
        var toast = toastr[type](msg, title);
        self.lastToast = toast;
        return toast;
    };
}