'use strict'

var Person = (function() {

    var list_people = []

    function init()
    {
        bindings()
        addPerson("Jorge", 29)
        addPerson("Ivonete", 27)
        addPerson("Marizete", 32)
        addPerson("Maikon", 27)
        refreshHtmlTable()
    }

    function bindings()
    {
        $('.js-open-add-person-modal').click(function() {
            openAddPersonModal()
        })

        $('.js-add-person').click(function() {
            var name = $('#name').val()
            var age = $('#age').val()
            addPerson(name, age)
            closeAddPersonModal()
            refreshHtmlTable()
            cleanFieldsPersonModal()
        })

        $(document).on('click', '.js-edit-person', function() {
            var id = $(this).data('id')
            openAddPersonModal()
        })

        $(document).on('click', '.js-delete-person', function() {
            var id = $(this).data('id')
            deletePerson(id)
            refreshHtmlTable()
        })
    }

    function openAddPersonModal()
    {
        $('#modal_add_person').modal('show')
    }

    function closeAddPersonModal()
    {
        $('#modal_add_person').modal('hide')
    }

    function cleanFieldsPersonModal()
    {
        $('#modal_add_person input').val('')
    }

    function addPerson(name, age)
    {
        var newId = list_people.length + 1
        var newPerson = {
            id: newId,
            name: name,
            age: age
        }
        list_people.push(newPerson)
    }

    function editPerson(id)
    {
        list_people.forEach()
    }
    
    function deletePerson(id)
    {
        for(var i = 0; i < list_people.length; i++)
        {
            if(list_people[i].id == id)
            {
                list_people.splice(i, 1)
                break
            }
        }
    }

    function refreshHtmlTable()
    {
        console.log('entrei');
        var $people_table = $('#people_table tbody')
        
        $('#people_table tbody').html('')

        list_people.forEach(function(person) {
            var $td_id = $('<td />').html(person.id)
            var $td_name = $('<td />').html(person.name)
            var $td_age = $('<td />').html(person.age)

            var $btn_edit = $('<button />',
                {type: "button", class: "btn btn-xs btn-warning js-edit-person", 'data-id': person.id})
                .html('Edit')

            var $btn_delete = $('<button />',
                {type: "button", class: "btn btn-xs btn-danger js-delete-person", 'data-id': person.id})
                .html('Delete')

            var $td_options = $('<td />').append($btn_edit, $btn_delete)

            var $tr = $('<tr />').append($td_id, $td_name, $td_age, $td_options)

            $people_table.append($tr)
        })
    }

    return {
        init: init
    }

})()

Person.init()
