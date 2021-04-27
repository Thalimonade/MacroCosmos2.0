FlowRouter.route('/', {
    name: 'accueil',
    action(){
        BlazeLayout.render('LoginSignUp');
    }
});