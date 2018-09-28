#!/usr/bin/env node

const axios = require('axios');
const Table = require('cli-table3');
const ora = require('ora');

var apiurl = 'https://api.jsonbin.io/b/5b8e93e4db948c68635c80f4/latest';

async function go() {

	const spinner = new ora({
		text: 'Fetching Marvel Movie List [Avengers]',
		spinner: 'hamburger'
	});

	spinner.start();

	setTimeout(() => {
		spinner.color = 'yellow';
		spinner.text = 'Successfully Fetched the Movie List';
	}, 1000);

	try {
		await new Promise(resolve => setTimeout(resolve, 2000));
		const wes = await axios(apiurl);
		var marvel = wes.data;
		const group = marvel.items.map(g => [
			g.id,
			g.title,
			g.release_date
		]);
  
		const table = new Table({
			chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
				, 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
				, 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
				, 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
			style: {head: ['green'],
				border: ['yellow']},
			head: ['ID', 'Movie', 'Release Date'],
			colWidths: [10, 40, 16]
		});

		table.push(...group);
		spinner.stop();
		console.log('\n');
		console.log(table.toString());
		console.log('\n');

	} catch (e) {
		spinner.stop();
		console.error(e);
	}
}
go();