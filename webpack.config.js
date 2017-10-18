var path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const extractLess = new ExtractTextPlugin("css/[name].[contenthash].css");
const htmlplugin = new HtmlWebpackPlugin({
                inject:'body',
                template: './static/index.html',
                filename: './html/index.html',
                chunks:'js/index',
                hash:false
            })

var config = {
	entry:{'index':'./static/index.js'},
	output:{
		filename:'js/[name].js',
		path: path.join(__dirname, 'public'),
        publicPath: "../",
	},
	"node": {
	  "fs": false
	},
	/*externals:{
		jQuery : 'window.$',
	},*/
	plugins:[extractLess,htmlplugin],
	module:{
		rules : [{
			test:/\.js$/,
			use:[{
				loader:'babel-loader'
			}]
		},{ 
			test: /\.less$/, 
			use : ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: ["css-loader",'less-loader']
	        })//['style-loader','css-loader','less-loader']
		},{ 
			test: /\.html$/, 
			use : [{
				loader:'html-loader'
			}]
		}]
	},
	/*module:{
		loaders:[{
			test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['env','es2015']
            }
		},
		{ test: /\.css$/, loader: 'style-loader!css-loader' },
		//{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}//extractLess.extract(['css','less'])
		{ test: /\.less$/, loader: extractLess.extract(['style!css!less'])}
		//{ test: require.resolve("./static/lib/jquery.js"), loader: "expose-loader?$" }
		]
	}*/
}

module.exports = config;