/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */

export default function () {
    return {
	"query": ["category:all", "topic:all", "year:all", "TotalResultSize: 22"],
	"queryResult": [{
		"categories": {
			"volvo:volvobuses/news/category-tags/category/news_newsletters": "Newsletters",
			"volvo:volvobuses/news/category-tags/category/news_pressrelease_news": "Press release",
			"volvo:volvobuses/news/category-tags/category/news_customer_magazine": "Customer magazine"
		},
		"topics": {
			"volvo:volvobuses/news/topic-tags/topic/buses": "Buses",
			"volvo:volvobuses/news/topic-tags/topic/coaches": "Coaches",
			"volvo:volvobuses/news/topic-tags/topic/samplenew": "samplenew",
			"volvo:volvobuses/news/topic-tags/topic/news_environment": "Environment",
			"volvo:volvobuses/news/topic-tags/topic/customer-story": "Customer story",
			"volvo:volvobuses/news/topic-tags/topic/news_safety": "Safety",
			"volvo:volvobuses/news/topic-tags/topic/news_corporate": "Corporate",
			"volvo:volvobuses/news/topic-tags/topic/quality": "Quality",
			"volvo:volvobuses/news/topic-tags/topic/news_product": "Product",
			"volvo:volvobuses/news/topic-tags/topic/city-mobility": "City mobility",
			"volvo:volvobuses/news/topic-tags/topic/chassis": "Chassis",
			"volvo:volvobuses/news/topic-tags/topic/electromobility": "Electromobility"
		},
		"years": {
			"2018": "2018",
			"2017": "2017",
			"2016": "2016",
			"2011": "2011",
			"2010": "2010"
		},
		"segments": {}
	}]
}
}
