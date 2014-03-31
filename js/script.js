var interval ;
var interval2;
var nombre_de_personnage
var score = 0;

var tomber = function(tableau_personnage,tableau_marcheur, height_aire, width_aire)
{
	/* Une chance sur trois d'en faire apparaitre */
	var random = Math.floor((Math.random()*25)+1);
	/* if it's three */
	if( random == 3 )
	{
		/* If we still can generate  */
		if(nombre_de_personnage != 0 )
		{
			/* Creatre a goomba */ 
			creer_personnage(tableau_personnage, width_aire);
			/* we reduce the number of remaning goombas*/
			nombre_de_personnage--;
			/* update the score */
			document.getElementById("score-courant").innerHTML = "Score : " + score + " / " + ( 500 - nombre_de_personnage);
		}
	}
	/* for all the goombas falling */
	for( var i = 0 ; i < tableau_personnage.length ; i++ )
	{
		/* if the gooba can he falls */
		if((parseInt(tableau_personnage[i].style.top.slice(0,-2)))  <= (height_aire - 25))
		{
			tableau_personnage[i].style.top = "" + (parseInt(tableau_personnage[i].style.top.slice(0,-2)) + 1) + "px"; 
		}
		/* otherwise we delete it of the goomba list and it adds to the walking goombas list */
		else if( (parseInt(tableau_personnage[i].style.top.slice(0,-2)) + 1)  >= ( height_aire - 25 ) )
		{
			/* we remove the on mouse over */
			tableau_personnage[i].onmouseover = function() {};
			/* we add the goomba to the walking goombas list */
			tableau_marcheur.push(tableau_personnage[i]);
			/* we delete the goomba of the falling goomba list */
			tableau_personnage.splice(i,1);
		}
	}
	/* for all walking goombas */
	for( var i = 0 ; i < tableau_marcheur.length ; i++ )
	{
		/* if it can it continues */
		if((parseInt(tableau_marcheur[i].style.left.slice(0,-2))) <= (width_aire - 49))
		{
			// it goes to the castle
			changer_image(tableau_marcheur[i]);
			tableau_marcheur[i].style.left = "" + (parseInt(tableau_marcheur[i].style.left.slice(0,-2)) + 1)  + "px";
		}
		/* if it arrives to the castle */
		else if((parseInt(tableau_marcheur[i].style.left.slice(0,-2))) >= (width_aire - 49))
		{
			// we delete it of the screen
			document.getElementById("aire").removeChild(tableau_marcheur[i]);
			tableau_marcheur.splice(i,1);
		}
	}
	
	/* End of game */
	if( tableau_personnage.length == 0 && tableau_marcheur.length == 0 )
	{
		/* stop setInterval function */
		window.clearInterval(interval) ;
		/* we create the score div */
		var div_score = document.createElement("div");
		/* give attribute to the div */
		div_score.setAttribute("id","score");
		/* we display the score */
		div_score.innerHTML = "<h1><br /><br />your score is  " + score + " / 500<br />" + ((score / (500 - nombre_de_personnage)) * 100) + " % <br />you still want ? use the button<br /><br /><button OnClick='javascript:window.location.reload()' >Restart</button></h1>" ;
		/* add div element to the page */
		document.getElementById("aire").appendChild(div_score);
	}
}

function init(nombre)
{
	/* delete explanation windows */
	document.getElementById("aire").removeChild(document.getElementById("explication"));
	/* init goomba number */
	nombre_de_personnage = nombre ;
	/* get area */
	var aire = document.getElementById("aire");
	/* get area size */
	var width_aire = aire.offsetWidth;
	/* We substract the goomba size */
	width_aire = width_aire - 25 ;
	/* Create goombas list */
	var tableau_personnage = Array();
	/* Create walking goombas list */
	var tableau_marcheur = Array();
	/* create a goomba */
	creer_personnage(tableau_personnage, width_aire);
	/* get area width */
	var height_aire = aire.offsetHeight;
	/* the goombas begin to fall  */
	interval = window.setInterval(function(){tomber(tableau_personnage, tableau_marcheur, height_aire, width_aire)}, 2 );
}

function changer_image(element)
{
	/* if element is class 1 */
	if( element.className == "bonhomme_1" )
	{
		/* we switch to class 2 */
		element.className = "bonhomme_2";
	}
	/* otherwise it is from second class */
	else
	{	
		/* we switch to class 1 */ 
		element.className = "bonhomme_1";
	}
}

function creer_personnage(tableau_personnage, width_aire)
{
	/* create a goomba */
	tableau_personnage.push( document.createElement("div") );
	/* we set it class */
	tableau_personnage[tableau_personnage.length - 1].setAttribute("class","bonhomme_1");
	/* we set the top position */
	tableau_personnage[tableau_personnage.length - 1].style.top = "0px";
	/* we set a radom left value (depend windows width) */
	tableau_personnage[tableau_personnage.length - 1].style.left = "" + Math.floor((Math.random()*(width_aire-110))+0) + "px";
	/* add event on mouse over */
	tableau_personnage[tableau_personnage.length - 1].onmouseover = function()
	{
		/* increase the current score */
		score = score + 1 ;
		/* update the score on screen */
		document.getElementById("score-courant").innerHTML = "Score : " + score + " / " + ( 500 - nombre_de_personnage);
		/* remove it from goomba list */
		for( var i in tableau_personnage )
		{
			/* if it's the element */
			if( tableau_personnage[i] == this )
			{
				/* we delete it */
				tableau_personnage.splice(i,1);
				/* and stop the for */
				break; 
			}
		}
		var moi_meme = this;
		setTimeout(function(){changer_explosion_1(moi_meme)},35);
	}
	/* the goomba is on screen */
	document.getElementById("aire").appendChild(tableau_personnage[tableau_personnage.length - 1]);
}

var changer_explosion_1 = function(element)
{
	/* set goomba with first explosion class */
	element.className = "bonhomme_explosion_1"
	/* call the second explosion function */
	setTimeout(function(){changer_explosion_2(element)},35);
}

var changer_explosion_2 = function(element)
{
	/* set goomba with second explosion class */
	element.className = "bonhomme_explosion_2";
	/* call supprimer_element function */
	setTimeout(function(){supprimer_element(element)},35);
}

var supprimer_element = function(element)
{
	// delete the goomba from the screen */
	document.getElementById("aire").removeChild(element);
}
