'use strict'

var Person = (function() {

    var list_people = []

    function init()
    {
        bindings()
    }

    function bindings()
    {
        $('#action_open_add_person_modal').click(function() {
            openAddPersonModal()
        })
    }

    function openAddPersonModal()
    {
        $('#modal_add_person').modal('show')
    }

    return {
        init: init
    }

})()

Person.init()
