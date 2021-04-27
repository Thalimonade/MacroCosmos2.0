FlowRouter.route('/', {
    name: 'welcome',
    action(){
        BlazeLayout.render('app_body', {main: 'acc'});
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action(){
        BlazeLayout.render('LoginSignUp');
        BlazeLayout.render('listCategories');
    }
});

FlowRouter.route('/signUp', {
    name: 'inscription',
    action(){
        BlazeLayout.render('signUpPage');
    }
});

FlowRouter.route('/creationProfil', {
    name: 'newProfil',
    action(){
        BlazeLayout.render('LoginSignUp');
    }
}); 

FlowRouter.route('/accueils', {
    name: 'BlueRedP',
    action(){
        BlazeLayout.render('LoginSignUp');
    }
}); 