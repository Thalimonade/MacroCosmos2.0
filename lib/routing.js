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
        BlazeLayout.render('app_body', { main: 'accueilBleu' });;
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

FlowRouter.route('/accueils', {
    name: 'accueils2x',
    action(){
        BlazeLayout.render('app_body', { main: 'accueils' });
    }
});

FlowRouter.route('/preferences', {
    name: 'preferences',
    action(){
        BlazeLayout.render('app_body', { main: 'preferences' });
    }
});

// routes de l'accueil rouge
FlowRouter.route('/random-encounter', {
    name: 'SwipeGo',
    action(){
        BlazeLayout.render('accueilRouge', { main: 'Swipe' });
    }
});



// routes de l'accueil bleu
FlowRouter.route('/random-encounter', {
    name: 'HomeMap',
    action(){
        BlazeLayout.render('accueilBleu', { main: 'carteBlue' });
    }
});


 