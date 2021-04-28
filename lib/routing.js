FlowRouter.route('/', {
    name: 'welcome',
    action(){
        BlazeLayout.render('app_body', { main: 'welcome' });
    }
});

FlowRouter.route('/accueilRouge', {
    name: 'Arouge',
    action(){
        BlazeLayout.render('app_body', { main: 'accueilRouge' });
    }
});

FlowRouter.route('/accueilBleu', {
    name: 'Ableu',
    action(){
        BlazeLayout.render('app_body', { main: 'acceuilBleu' });;
    }
});

FlowRouter.route('/creationProfil', {
    name: 'newProfil',
    action(){
        BlazeLayout.render('app_body', { main: 'creationProfil' });
    }
}); 

FlowRouter.route('/login', {
    name: 'log',
    action(){
        BlazeLayout.render('app_body', { main: 'login' });
    }
});

FlowRouter.route('/signUpPage', {
    name: 'signUpP',
    action(){
        BlazeLayout.render('app_body', { main: 'signUpPage' });
    }
});



 