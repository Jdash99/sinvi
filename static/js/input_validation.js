(function($) {
    $.fn.bootstrapValidator.validators.password = {
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value === '') {
                return true;
            }

            // Check the password strength
            if (value.length < 8) {
                return false;
            }

            // The password doesn't contain any uppercase character
            if (value === value.toLowerCase()) {
                return false;
            }

            // The password doesn't contain any uppercase character
            if (value === value.toUpperCase()) {
                return false;
            }

            // The password doesn't contain any digit
            if (value.search(/[0-9]/) < 0) {
                return false;
            }

            return true;
        }
    };
}(window.jQuery));

$(document).ready(function() {
    $('#productForm').bootstrapValidator({
        fields: {
            product_name: {
                validators: {
                    notEmpty: {
                        message: "Required"
                    }
                }
            },
            initial_inventory: {
                validators: {
                    notEmpty: {
                        message: "Required"
                    },
                    integer: {
                        message: "Must be an integer"
                    },
                    greaterThan: {
                        value: 0,
                        message: "Must be equal or greater than zero"
                    }

                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "Required"
                    },
                    numeric: {
                        message: "Must be a real number"
                    },
                    greaterThan: {
                        value: 0,
                        message: "Must be equal or greater than zero"
                    }
                }
            },        
            order_cost: {
                validators: {
                    notEmpty: {
                        message: "Required"
                    },
                    numeric: {
                        message: "Must be a real number"
                    },
                    greaterThan: {
                        value: 0,
                        message: "Must be equal or greater than zero"
                    }
                }
            },
            demand_p1: {
                validators: {
                    notEmpty: {
                        message: "Required"
                    },
                    integer: {
                        message: "Must be an integer"
                    },
                    greaterThan: {
                        value: 0,
                        message: "Must be equal or greater than zero"
                    }
                }
            },
            demand_p2: {
                validators: {
                    notEmpty: {
                        message: "Required"
                    },
                    integer: {
                        message: "Must be an integer"
                    },
                    greaterThan: {
                        value: 0,
                        message: "Must be equal or greater than zero"
                    }
                }
            },
            demand_p3: {
                validators: {
                    notEmpty: {
                        message: "Required"
                    },
                    integer: {
                        message: "Must be an integer"
                    },
                    greaterThan: {
                        value: 0,
                        message: "Must be equal or greater than zero"
                    }
                }
            },            
            leadtime_p1: {
                validators: {
                    notEmpty: {
                        message: "Required"
                    },
                    integer: {
                        message: "Must be an integer"
                    },
                    greaterThan: {
                        value: 0,
                        message: "Must be equal or greater than zero"
                    }
                }
            },
            leadtime_p2: {
                validators: {
                    notEmpty: {
                        message: "Required"
                    },
                    integer: {
                        message: "Must be an integer"
                    },
                    greaterThan: {
                        value: 0,
                        message: "Must be equal or greater than zero"
                    }
                }
            },    
            leadtime_p3: {
                validators: {
                    notEmpty: {
                        message: "Required"
                    },
                    integer: {
                        message: "Must be an integer"
                    },
                    greaterThan: {
                        value: 0,
                        message: "Must be equal or greater than zero"
                    }
                }
            },                                
        }
    });

    $('#parametersForm').bootstrapValidator({
        // feedbackIcons: {
        //     valid: 'glyphicon glyphicon-ok',
        //     invalid: 'glyphicon glyphicon-remove',
        //     validating: 'glyphicon glyphicon-refresh'
        // },
        fields: {
            periods: {
                validators: {
                    notEmpty: {
                        message: 'Periods is required'
                    },
                    numeric: {
                        message: 'Periods must be a number'
                    }
                }
            },
            p1: {
                validators: {
                    notEmpty: {
                        message: 'The amount is required'
                    },
                    numeric: {
                        message: 'The amount must be a number'
                    }
                }
            },
            p2: {
                validators: {
                    notEmpty: {
                        message: 'The parameter is required'
                    },
                    numeric: {
                        message: 'The amount must be a number'
                    }
                }
            },
        }
    });

    $('#myModal').on('shown.bs.modal', function() {
    $('#productForm').bootstrapValidator('resetForm', true);
});
});
