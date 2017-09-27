angular.module('spinnerModule', [])
    .factory('spinnerSvc', function () {
        // create an object to store spinner APIs.
        var _self = this;
        var _spinners = {};

        this.spinners = function() {
            return _spinners;
        };

        return {
            showSpinner: function (identifier, target, spinnerOptions, maskOptions) {

                target = '.' + target;
                // Prepare mask defaults:
                var maskDefaults = {
                    showMask: true,
                    className: 'spinner-mask',
                    backgroundColor: 'rgba(248, 248, 248, 0.75)',
                    zIndex: '9998',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                };

                // Prepare the spinner and mask:
                if (!_self.spinners()[identifier]) {
                    // Prepare the maks options:
                    if (typeof spinnerOptions != 'object' || !spinnerOptions) {
                        spinnerOptions = {
                            lines: 12, // The number of lines to draw
                            length: 12, // The length of each line
                            width: 3, // The line thickness
                            radius: 6, // The radius of the inner circle
                            corners: 1, // Corner roundness (0..1)
                            rotate: 0, // The rotation offset
                            direction: 1, // 1: clockwise, -1: counterclockwise
                            color: '#44565f', // #rgb or #rrggbb or array of colors
                            speed: 1, // Rounds per second
                            trail: 60, // Afterglow percentage
                            shadow: false, // Whether to render a shadow
                            hwaccel: false, // Whether to use hardware acceleration
                            className: 'spinner', // The CSS class to assign to the spinner
                            zIndex: 200000, // The z-index (defaults to 2000000000)
                            top: '50%', // Top position relative to parent
                            left: '50%' // Left position relative to parent
                        };
                    }
                    // Create the spinner:
                    var spinner = new Spinner(spinnerOptions);
                    // Prepare the mask options:
                    if (typeof maskOptions == 'object' && maskOptions) {
                        for (var key in maskOptions) {
                            maskDefaults[key] = maskOptions[key];
                        }
                    }
                    // Create the mask:
                    var mask = document.createElement('div');
                    mask.className = maskDefaults.className;
                    mask.style.backgroundColor = maskDefaults.backgroundColor;
                    mask.style.zIndex = maskDefaults.zIndex;
                    mask.style.position = maskDefaults.position;
                    mask.style.top = maskDefaults.top;
                    mask.style.left = maskDefaults.left;
                    mask.style.width = maskDefaults.width;
                    mask.style.height = maskDefaults.height;
                    // Store the spinner and mask:
                    _self.spinners()[identifier] = {
                        spinner: spinner,
                        mask: mask
                    };
                }

                // Show the spinner:
                if (maskDefaults.showMask) {
                    // Append the mask to the target and show the spinner in the mask:
                    _self.spinners()[identifier].spinner.spin(_self.spinners()[identifier].mask);
                    $(target).append(_self.spinners()[identifier].mask);
                } else {
                    // Show the spinner in the target:
                    _self.spinners()[identifier].spinner.spin($(target).get(0));
                }
            },
            hideSpinner: function (identifier) {

                if (_spinners[identifier]) {
                    _spinners[identifier].spinner.stop();
                    $(_spinners[identifier].mask).remove();
                }
            },

            destroySpinner: function (identifier) {
                _self.hideSpinner(identifier);
                _spinners[identifier] = null;
            }
        }

    })
