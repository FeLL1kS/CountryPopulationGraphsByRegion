import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Bar } from 'react-chartjs-2'

import { Container, Grid, makeStyles, createStyles, Theme } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { chunkArray } from '../helpers';
import { Country } from '../types/country';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      minHeight: '100vh',
    },
    pagination: {
      margin: `auto 0 ${theme.spacing(2)}px 0`
    }
  })
)

const CountryGrid: React.FC = () => {
  const classes = useStyles();

  const { countries, error, loading } = useTypedSelector(state => state.countries);
  const { fetchCountries } = useActions();
  const [page, setPage] = React.useState(1);

  const borderColor = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ]

  const backgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
  ]

  useEffect(() => {
    fetchCountries();
  }, [])

  const formBarsArray = (): JSX.Element[] => {
    if (countries.length === 0) {
      return [];
    }
    
    const countriesCopy = countries.concat();

    const result: JSX.Element[] = [];
    
    while (countriesCopy.length) {
      const lastIndexOfCurrentRegionName = countriesCopy.map(c => c.region).lastIndexOf(countriesCopy[0].region);

      const tempCountriesArray = countriesCopy.splice(0, lastIndexOfCurrentRegionName + 1);

      const chunkedTempCountriesArray: Country[][] = chunkArray(tempCountriesArray, 10);

      chunkedTempCountriesArray.map(c => {
        const data = {
          labels: c.map(с => с.alpha3Code),
          datasets: [{
            label: c[0].region,
            data: c.map(с => с.population),
            backgroundColor,
            borderColor,
            borderWidth: 1
          }]
        };

        result.push(
          <Grid item xs={6}>
            <Bar
              type={'bar'}
              data={data}
              height={140}
              options={{
                indexAxis: 'y',
                responsive: true,
                scales: {
                y: {
                  beginAtZero: true,
                } 
                }
              }}
            />
          </Grid>
        )
      })
    }

    return result;
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  
  const bars: JSX.Element[][] = chunkArray(formBarsArray(), 4);

  if (loading) {
    return <h1>Загрузка...</h1>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <Container maxWidth='xl' className={classes.root}>
      <Grid container spacing={3}>
        {bars[page - 1]}
      </Grid>
      <Pagination 
        count={bars.length} 
        page={page} 
        onChange={handleChange} 
        className={classes.pagination} 
        variant="outlined" 
        shape="rounded" 
      />
    </Container>
  );
}

export default CountryGrid;