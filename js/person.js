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

        $(document).on('click', '.js-add-person', function() {
            var person_name = $('#person_name').val()
            var person_age = $('#person_age').val()
            addPerson(person_name, person_age)
            closeAddPersonModal()
            refreshHtmlTable()
            cleanFieldsPersonModal()
        })

        $(document).on('click', '.js-open-edit-person-modal', function() {
            var id = $(this).data('id')
            openEditPersonModal()
        })

        $(document).on('click', '.js-open-delete-person-modal', function() {
            var id = $(this).data('id')
            deletePerson(id)
            refreshHtmlTable()
        })
    }

    function openAddPersonModal()
    {
        $('#modal_add_person .modal-title').html('Add Person')
        $('#modal_add_person .modal-action').removeClass('js-edit-person').addClass('js-add-person')
        $('#modal_add_person').modal('show')
    }

    function openEditPersonModal()
    {
        $('#modal_add_person .modal-title').html('Edit Person')
        $('#modal_add_person .modal-action').removeClass('js-add-person').addClass('js-edit-person')
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

    function editPerson(id, name, age)
    {
        debugger
        for(var i = 0; i < list_people.length; i++)
        {
            if(list_people[i].id == id)
            {
                list_people[i] = {
                    id: id,
                    name: name,
                    age: age
                }
                break
            }
        }
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

            var $btn_edit = $('<button />', {
                'type': 'button',
                'class': 'btn btn-xs btn-warning js-open-edit-person-modal',
                'data-id': person.id
            }).html('<span class="glyphicon glyphicon-pencil"></span>&nbsp; Edit')

            var $btn_delete = $('<button />', {
                'type': 'button',
                'class': 'btn btn-xs btn-danger js-open-delete-person-modal',
                'data-id': person.id
            }).html('<span class="glyphicon glyphicon-trash"></span>&nbsp; Delete')

            var $td_options = $('<td />').append($btn_edit, ' ', $btn_delete)

            var $tr = $('<tr />').append($td_id, $td_name, $td_age, $td_options)

            $people_table.append($tr)
        })
    }

    return {
        init: init
    }

})()

Person.init()
