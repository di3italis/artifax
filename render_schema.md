Following this guide, you can easily have different environments 
for the same underlying web service, all deployed on Render.  
This means you can have:

- An environment for prod.
- An environment for testing/dev.
- An environment for your completed MVP/grading.

## What Does this Solve?
Imagine you finish your MVP, and you're waiting for grading.  
You don't want to mess up your live site, but you also want to 
keep adding features and deploying them on Render.  
This guide solves that concern.  

Here's how: create a Render web service for your "graded" live site, 
and a new Render web service for your new features. 

## Quick Summary for Implementation**: 
- Use separate branches on GitHub for each environment ('testing version', 'graded version', 'post-MVP features version').
- When deploying to Render, select the git branch that corresponds to your version of the live site (i.e. the "post-mvp" branch will be the deployment branch for the "post-mvp web service" that has the "post_mvp schema env variable" set on Render.).
- On Render, change the `SCHEMA` environment variable for each version of your web service on Render.  This allows you to essentially have identical tables all in the same database, since they'll all live within their own schema.  Think of a schema like a mini-database.
