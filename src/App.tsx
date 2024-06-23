import { Container, Table } from '@mantine/core';
import { getYearlyMaxMinProduction, getAverageYieldAndArea } from './data';

const App = () => {
  const yearlyMaxMin = getYearlyMaxMinProduction();
  const averageYieldAndArea = getAverageYieldAndArea();

  return (
    <Container>
      <h1 style={{textAlign: "center"}}>Agriculture Analytics</h1>
      <h2>Yearly Max/Min Production</h2>
      <Table style={{border: "1px solid black"}}>
        <thead style={{border: "1px solid black"}}>
          <tr>
            <th style={{border: "1px solid black"}}>Year</th>
            <th style={{border: "1px solid black"}}>Max Production Crop</th>
            <th style={{border: "1px solid black"}}>Min Production Crop</th>
          </tr>
        </thead>
        <tbody style={{border: "1px solid black", textAlign: "center"}}>
          {yearlyMaxMin.map((row) => (
            <tr key={row.year}>
              <td style={{border: "1px solid black"}}>{row.year}</td>
              <td style={{border: "1px solid black"}}>{row.max}</td>
              <td style={{border: "1px solid black"}}>{row.min}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Average Yield and Cultivation Area (1950-2020)</h2>
      <Table style={{border: "1px solid black"}}>
        <thead style={{border: "1px solid black"}}>
          <tr>
            <th style={{border: "1px solid black"}}>Crop</th>
            <th style={{border: "1px solid black"}}>Average Yield (Kg/Ha)</th>
            <th style={{border: "1px solid black"}}>Average Cultivation Area (Ha)</th>
          </tr>
        </thead>
        <tbody style={{border: "1px solid black", textAlign: "center"}}>
          {averageYieldAndArea.map((row) => (
            <tr key={row.crop}>
              <td style={{border: "1px solid black"}}>{row.crop}</td>
              <td style={{border: "1px solid black"}}>{row.averageYield}</td>
              <td style={{border: "1px solid black"}}>{row.averageArea}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
