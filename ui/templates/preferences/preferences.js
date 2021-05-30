import './preferences.html'

const Swal = require('sweetalert2');

Template.preferences.events({
    'click #save': function() {
            Swal.fire({
                title: 'Confirmation',
                text: "Your changes have been saved!",
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ok'
            })
        }
});