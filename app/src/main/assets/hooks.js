var gradle = { log: function(val){val && console.log( gradle.isMobile && (typeof val === 'object') ? JSON.stringify(val) : val );},
/**
	GRADLE - KNOWLEDGE IS POWER
	***** JACOB SERVICES LLC ***
    ***** PROPRIETARY CODE *****
    @author : gradle (jacob.services@outlook.com)
	@date: 01/26/2021 14:43:00
	@version: 7.0.0
	copyright @2021
*/

    intervalAds    : 1,     //Ads each interval for example each 3 times
	
	//Game settings :
	fullsize : true,
	text_color : 'brown',
	btn_pause : {
		x: 0,
		y: 40,
		width: 60, 
		height: 60
	},
	
	players_names:[
		'Julien',
		'Andy',
		'Emilie',
		'Maria',
		'Bob',
		'Steven',
		'Jack',
		'Joe',
		'Nicola',
		'Micheal',
		'James',
		'Xiao',
		'Ramis',
		'Alain',
		'Robert',
		'Letitia',
		'Randi',
		'Roslansky',
		'Eva'
	],
	
	
	
	//Events manager :
	//================
    event: function(ev, msg){
		if(gradle.process(ev,msg))
        switch(ev){

		case 'first_start':   //First start
			//gradle.showInter();
			break;
		case 'button_play':
			gradle.showInter();
			break;
		case 'page_settings':
			//gradle.showInter();
			break;
		case 'button_quit':
			//gradle.showInter();
			break;
		case 'button_pause':
			//gradle.showInter();
			break;
		case 'player_win':
			gradle.showInter();
			break;
		case 'game_end':
			//gradle.showInter();
			break;
		case 'page_menu':
			//gradle.checkInterval() && gradle.showInter();
			break;	
		case 'test':
			//gradle.checkInterval() && gradle.showInter();
			break;
		
        }
    },





    //Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
    //=========================
	start: function(){
		setTimeout(function(){
			gradle.score = localStorage.getItem('ludo_score');
			if(gradle.score == null){
				gradle.score = 0;
				localStorage.setItem('ludo_score', 0);
			}
			first_start();
		}, 600);
		setTimeout(function(){gradle.event_ext('hide_splash');}, 600);
    },
	pause: function(){
		console.log('gradle pause ...');
		setTimeout(function(){
			main.phaserGame.paused= true;
			gradle.log('>>>> mute');
		},1200);
    },
	resume: function(){
		console.log('gradle resume ...');
		main.phaserGame.paused     = false;
    },

    run: function() {
        gradle.event('first_start');
		gradle.isMobile = ( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) );
        document.addEventListener("visibilitychange", gradle.onVisibilityChanged, false);
		gradle.start();
		setTimeout(function(){gradle.save_score(0,0);}, 800);
    },
	score : 0,
    save_score(score, level){
        gradle.event_ext('save_score|'+score+'|'+level);
    },

	mute: false,
    event_ext: function(val){
		if(this.isMobile && typeof jacob!='undefined'){
		    if(val=='show_profile'){
		        //gradle.enable_pause = false;
		    }
			jacob.do_event(val);
		}
	},
	
	shuffle: function(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	  }

	  return array;
	},

	old_ev: null,
    process: function(ev, msg){
		if(gradle.old_ev ==ev){
			if(ev=='button_share' || ev=='button_play'){
				console.log('repeat');
				//return false;
			}
		}
        switch(ev){
            case 'btn_more':
                gradle.event_ext('show_more');
                break;
            case 'btn_privacy':
                gradle.event_ext('show_privacy');
                break;
            case 'btn_share':
                gradle.event_ext('show_share');
                break;
            case 'btn_profile':
                gradle.event_ext('show_profile');
                break;
            case 'btn_exit_game':
                gradle.event_ext('exit_game');
                break;
        }
		gradle.old_ev = ev;
		gradle.log(ev,msg);
		return true;
    },

    showInter: function(){
        if(!gradle.isMobile) return;
        gradle.log('jacob|show_inter');
    },

	enable_music: true,
    enable_pause: true,
	onVisibilityChanged : function(){
	    if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden){
	        gradle.pause();
	        setTimeout(function(){
	            if(!gradle.enable_pause){
                    gradle.resume();
                }
	        }, 500);
		}else{
		    gradle.enable_pause = true;
			gradle.resume();
		}
	},

	currentInterval : 0,
	checkInterval: function(){
		return (++gradle.currentInterval==gradle.intervalAds) ? !(gradle.currentInterval=0) : !1;
	},
	
	prefix : "gd.4026.",
	buildKey: function(key){
		return gradle.prefix + key;
	},

	getItem: function(key, default_value){
		var value;
		try {
			value = localStorage.getItem(gradle.buildKey(key));
		}
		catch(error){
			return default_value;
		}
		if(value !== undefined && value !=null){
			value = window.atob(value);
		}
		else{
			value = default_value;
		}
		return value;
	},

	setItem: function(key, value){
		var v = value;
		if(v !== undefined){
			v = window.btoa(v);
		}
		try{
			localStorage.setItem(gradle.buildKey(key), v);
			return value;
		}
		catch(error){
			return undefined;
		}
	}
};
gradle.run();
