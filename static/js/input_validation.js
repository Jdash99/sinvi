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
            }
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
            }
        }
    })
    .on('error.field.bv', function(e, data) {
        data.bv.disableSubmitButtons(true); // disable submit buttons on errors
    })
    .on('status.field.bv', function(e, data) {
        data.bv.disableSubmitButtons(false); // enable submit buttons on valid
    });

    $('#myModal').on('shown.bs.modal', function() {
        $('#productForm').bootstrapValidator('resetForm', true);
    });
});