const express = require('express');
const request = require('request-promise');
const cheerio = require('cheerio');//used for doing easy queries
const app =express();
const port=8000;//port number


// route to display top 5 latest news
app.get('/getTimeStories', async function(req,res){ 

   try {
    let latestNews=[];

    // fetching data from the passed link
    const response = await request({
        uri:'https://time.com/',
        gzip:true,
 
    })

    // Quering dom wiith the help of cheerio

    let $=cheerio.load(response)
   const title1=$('.latest > ol >li:nth-child(1) >article >div >h2 >a' ).text().trim();
   const title2=$('.latest > ol >li:nth-child(2) >article >div >h2 >a' ).text().trim();
   const title3=$('.latest > ol >li:nth-child(3) >article >div >h2 >a' ).text().trim();
   const title4=$('.latest > ol >li:nth-child(4) >article >div >h2 >a' ).text().trim();
   const title5=$('.latest > ol >li:nth-child(5) >article >div >h2 >a' ).text().trim();

    const link1=$('.latest > ol >li:nth-child(1) >article >div >h2 >a' ).attr("href");
    const link2=$('.latest > ol >li:nth-child(2) >article >div >h2 >a' ).attr("href");
    const link3=$('.latest > ol >li:nth-child(3) >article >div >h2 >a' ).attr("href");
    const link4=$('.latest > ol >li:nth-child(4) >article >div >h2 >a' ).attr("href");
    const link5=$('.latest > ol >li:nth-child(5) >article >div >h2 >a' ).attr("href");



    // storing the latest news in array of object
    latestNews=[
        {
            "title":title1,
            "link":"https://time.com"+link1
         },
         {
            "title":title2,
            "link":"https://time.com"+link2
         },
         {
            "title":title3,
            "link":"https://time.com"+link3
         },
         {
            "title":title4,
            "link":"https://time.com"+link4
         },
         {
            "title":title5,
            "link":"https://time.com"+link5
         }
    ]
 
    res.json('200',{
        LatestNews:latestNews
    })
       
   } catch (error) {
       console.log(error)
       res.json('500',{
           message:"internal server error",
        
       })
   }

 
})


// setting up the server
app.listen(port,function(error){
  if(error){
      console.log('error in setting up the server')
  }
  else{
      console.log('server is up and runnig on port ',port)
  }
})



