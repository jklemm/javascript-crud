'use strict'

var Person = (function() {

    var increment = 0
    var list_people = []
    var $modal_person = $('#modal_person')

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
            refreshHtmlTable()
            closePersonModal()
            cleanFieldsPersonModal()
        })

        $(document).on('click', '.js-edit-person', function() {
            var person_id = $('#person_id').val()
            var person_name = $('#person_name').val()
            var person_age = $('#person_age').val()
            editPerson(person_id, person_name, person_age)
            refreshHtmlTable()
            closePersonModal()
            cleanFieldsPersonModal()
        })

        $(document).on('click', '.js-open-edit-person-modal', function() {
            var id = $(this).data('id')
            var person = getPerson(id)
            openEditPersonModal(person)
        })

        $(document).on('click', '.js-open-delete-person-modal', function() {
            var id = $(this).data('id')
            deletePerson(id)
            refreshHtmlTable()
        })
    }

    function openAddPersonModal()
    {
        $modal_person.find('.modal-title').html('Add Person')
        $modal_person.find('.modal-action').removeClass('js-edit-person').addClass('js-add-person')
        $modal_person.modal('show')
    }

    function openEditPersonModal(person)
    {
        $modal_person.find('.modal-title').html('Edit Person')
        $modal_person.find('.modal-action').removeClass('js-add-person').addClass('js-edit-person')

        $('#person_id').val(person.id)
        $('#person_name').val(person.name)
        $('#person_age').val(person.age)

        $modal_person.modal('show')
    }

    function closePersonModal()
    {
        $modal_person.modal('hide')
    }

    function cleanFieldsPersonModal()
    {
        $modal_person.find('input').val('')
    }

    function addPerson(name, age)
    {
        increment++
        var newPerson = {
            id: increment,
            name: name,
            age: age
        }
        list_people.push(newPerson)
    }

    function getPerson(id)
    {
        for(var i = 0; i < list_people.length; i++)
        {
            if(list_people[i].id == id)
            {
                return list_people[i]
            }
        }
    }

    function editPerson(id, name, age)
    {
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
        var $table_content = $('#people_table').find('tbody')
        
        $table_content.html('')

        list_people.forEach(function(person) {
            var $td_id = $('<td></td>').html(person.id)
            var $td_name = $('<td></td>').html(person.name)
            var $td_age = $('<td></td>').html(person.age)

            var $btn_edit = $('<button></button>', {
                'type': 'button',
                'class': 'btn btn-xs btn-warning js-open-edit-person-modal',
                'data-id': person.id
            }).html('<span class="glyphicon glyphicon-pencil"></span>&nbsp; Edit')

            var $btn_delete = $('<button></button>', {
                'type': 'button',
                'class': 'btn btn-xs btn-danger js-open-delete-person-modal',
                'data-id': person.id
            }).html('<span class="glyphicon glyphicon-trash"></span>&nbsp; Delete')

            var $td_options = $('<td></td>').append($btn_edit, ' ', $btn_delete)

            var $tr = $('<tr></tr>').append($td_id, $td_name, $td_age, $td_options)

            $table_content.append($tr)
        })
    }

    return {
        init: init
    }

})()

Person.init()
