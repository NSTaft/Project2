# Project2

Customized News Feed

This News Feed will allow users to log in and views articles and news from a customizable selection.

Articles can be favorited and displayed on the homepage. 

Comments can be added to articles by different users.


## User Stories

AAU, I would like to visit this site to read about subjects I care about, customizable by me.

AAU, I would like to leave comments on articles and share thoughts with a community.

## MVP Layout


### Homepage/Index

#### Header
"Welcome Statement" - Top Left
Button of 'Login/Signup' - Top Right

 #### Body

Button of 'Customize Feed' - Top Centered
Left Column Features Selected Sources To Follow, starts blank and fills when added to.

### Show Page

#### Header
"Selected Subject from Index Page"

#### Body

"Brief History/Description/Summary of Subject".

### Entity Relationship Diagram

User => Articles "One User to Many Favorited Articles"

User => Comments "One User to Many Comments"

Articles => "Many Articles to Many Comments"