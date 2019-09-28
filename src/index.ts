
import {MatchReader} from './MatchReader';
import {CsvFileReader} from './CsvFileReader';
import {Summary} from './Summary'
import { WinsAnalysis } from './analyzers/WinsAnalysis';
import { ConsoleReport } from './reportTargets/ConsoleReport';
import {HtmlReport} from './reportTargets/HtmlReport';
// import {MatchReader} from './inheritance/MatchReader';



const csvFileReader = new CsvFileReader('./football.csv'); 
// const matchReader = new MatchReader(csvFileReader);
// matchReader.load();
const matchReader = MatchReader.fromCsv('./football.csv');
matchReader.load();


// const summary1 = new Summary(new WinsAnalysis('Man United'),
//        new HtmlReport());

const summary = Summary.winsAnalysisWithHtmlReport('Man United')
summary.buildAndPrintReport(matchReader.matches);
    