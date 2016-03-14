'use strict'

var Datastore = (function(){
    var increment = 0
    var listPeople = []

    function getPerson(id)
    {
        for(var i = 0; i < listPeople.length; i++)
        {
            if(listPeople[i].id == id)
            {
                return listPeople[i]
            }
        }
    }

    function addPerson(name, age)
    {
        increment++
        var newPerson = {
            id: increment,
            name: name,
            age: age
        }
        listPeople.push(newPerson)
    }

    function editPerson(id, name, age)
    {
        for(var i = 0; i < listPeople.length; i++)
        {
            if(listPeople[i].id == id)
            {
                listPeople[i] = {
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
        for(var i = 0; i < listPeople.length; i++)
        {
            if(listPeople[i].id == id)
            {
                listPeople.splice(i, 1)
                break
            }
        }
    }

    function listAllPeople()
    {
        return listPeople
    }

    return {
        get: getPerson,
        add: addPerson,
        edit: editPerson,
        delete: deletePerson,
        list: listAllPeople
    }
})()
