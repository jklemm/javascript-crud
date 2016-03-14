'use strict'

var Person = (function(){

    var datastore = undefined
    var $modal_person = $('#modal_person')
    var $modal_person_id = $('#modal_person_id')
    var $modal_person_name = $('#modal_person_name')
    var $modal_person_age = $('#modal_person_age')

    function init(Datastore)
    {
        bindings()
        datastore = Datastore
        datastore.add("Fulano", 29)
        datastore.add("Ciclano", 27)
        datastore.add("Beltrano", 23)
        refreshHtmlTable()
    }

    function bindings()
    {
        $('.js-open-add-person-modal').click(function() {
            openAddPersonModal()
        })

        $(document).on('click', '.js-add-person', function() {
            var person_name = $modal_person_name.val()
            var person_age = $modal_person_age.val()
            datastore.add(person_name, person_age)
            refreshHtmlTable()
            closePersonModal()
            cleanFieldsPersonModal()
        })

        $(document).on('click', '.js-edit-person', function() {
            var person_id = $modal_person_id.val()
            var person_name = $modal_person_name.val()
            var person_age = $modal_person_age.val()
            datastore.edit(person_id, person_name, person_age)
            refreshHtmlTable()
            closePersonModal()
            cleanFieldsPersonModal()
        })

        $(document).on('keypress', '.js-search-person', function(event) {
            if(event.which == 13) // 13 is enter key
            {
                var person_id = $('#input_person_id').val()
                var person = datastore.get(person_id)
                $('#text_person_name').html(person.name)
                $('#text_person_age').html(person.age)
            }
        })

        $(document).on('click', '.js-open-edit-person-modal', function() {
            var id = $(this).data('id')
            var person = datastore.get(id)
            openEditPersonModal(person)
        })

        $(document).on('click', '.js-open-delete-person-modal', function() {
            var id = $(this).data('id')
            datastore.delete(id)
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

        $modal_person_id.val(person.id)
        $modal_person_name.val(person.name)
        $modal_person_age.val(person.age)

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

    function refreshHtmlTable()
    {
        var $table_content = $('#people_table').find('tbody')
        
        $table_content.html('')

        var people = datastore.list()

        people.forEach(function(person) {
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

Person.init(Datastore)
