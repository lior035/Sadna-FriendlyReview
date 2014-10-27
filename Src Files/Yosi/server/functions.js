module.exports = {};

module.exports['returnEmptyJSON'] = function(req,res)
{
	var empty = {};
	res.send(JSON.stringify(empty));
}


