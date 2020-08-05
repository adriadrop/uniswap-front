import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import td from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const NEW_PAIRS = gql `
    query {
    pairs(where: {reserveUSD_lt:5000} first: 200, 
    orderBy: createdAtTimestamp, orderDirection: desc) {
      id
      txCount
      totalSupply
      volumeUSD
      reserveUSD
      createdAtTimestamp
    token0 {
      name
      id
    }
    token1 {
      name
      id
    }
    }
  }
 `
 
var rowNumber = 0;


const numberFormat = (value) =>
  new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD'
  }).format(value);



class App extends Component {
  
    render() {

      return (

        <table>
        <thead>
            <tr>
            <th></th>
            <th>Token 1 Uniswap/Etherscan</th>
            <th>Token 2 Uniswap/Etherscan</th>
            <th>TX count</th>
            <th>Volume USD</th>
            <th>Current liquidty</th>
            <th>Pool Creation</th>
            <th>Uniswap</th>
            </tr>
          </thead>
          <tbody>

        <Query query={NEW_PAIRS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>
      
            const pairsToRender = data.pairs
      //console.log(pairsToRender);

            return (
            pairsToRender.map(function(item, key) {
                  
              var d = new Date(item.createdAtTimestamp * 1000);
              var formattedDate = d.getDate() + "/" + (d.getMonth() + 1); // + "-" + d.getFullYear();
              var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
              var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
              var formattedTime = hours + ":" + minutes;
              formattedDate = formattedDate + " " + formattedTime;

              rowNumber++;
              console.log(item);
                  return (
                    <tr key = {key}>
                        <td>{rowNumber}</td>
                        <td>{item.token0.name} <Link href= {"https://uniswap.info/token/" + item.token0.id} target="_blank" variant="body2">1</Link>  <Link href= {"https://etherscan.io/address/" + item.token0.id} target="_blank">2</Link></td>  
                        <td>{item.token1.name} <Link href= {"https://uniswap.info/token/" + item.token1.id} target="_blank" variant="body2">1</Link>  <Link href= {"https://etherscan.io/address/" + item.token1.id} target="_blank">2</Link></td>                  
                        <td>{item.txCount}</td>
                        <td>{numberFormat(item.volumeUSD)}</td>
                        <td>{numberFormat(item.reserveUSD)}</td>
                        <td>{formattedDate}</td>                  
                        <td><Link href= {"https://uniswap.info/pair/" + item.id} target="_blank" variant="body2">View pair</Link></td> 
                    </tr>
                  )
                })
            )
          }}
        </Query>
        </tbody>
        </table>
      )
    }
  }

export default App