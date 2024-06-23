import agricultureData from './indian_agriculture_data.json';

interface CropData {
  Country: string;
  Year: string;
  'Crop Name': string;
  'Crop Production (UOM:t(Tonnes))': string;
  'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))': string;
  'Area Under Cultivation (UOM:Ha(Hectares))': string;
}

interface YearlyProduction {
  max: string;
  maxVal: number;
  min: string;
  minVal: number;
}

const data: CropData[] = agricultureData as CropData[];

const parseValue = (value: string) => (value ? parseFloat(value) : 0);

// Table 1: Yearly Max/Min Production
export const getYearlyMaxMinProduction = () => {
  const years: { [year: string]: YearlyProduction } = {};

  data.forEach((item) => {
    const year = item.Year.split(', ')[1];
    const production = parseValue(item['Crop Production (UOM:t(Tonnes))']);

    if (!years[year]) {
      years[year] = {
        max: item['Crop Name'],
        maxVal: production,
        min: item['Crop Name'],
        minVal: production,
      };
    } else {
      if (production > years[year].maxVal) {
        years[year].max = item['Crop Name'];
        years[year].maxVal = production;
      }
      if (production < years[year].minVal && production > 0) {
        years[year].min = item['Crop Name'];
        years[year].minVal = production;
      }
    }
  });

  return Object.entries(years).map(([year, { max, min }]) => ({
    year,
    max,
    min,
  }));
};

// Table 2: Average Yield and Cultivation Area
export const getAverageYieldAndArea = () => {
  const crops: { [crop: string]: { totalYield: number; totalArea: number; count: number } } = {};

  data.forEach((item) => {
    const crop = item['Crop Name'];
    const yieldValue = parseValue(item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']);
    const area = parseValue(item['Area Under Cultivation (UOM:Ha(Hectares))']);

    if (!crops[crop]) {
      crops[crop] = { totalYield: yieldValue, totalArea: area, count: 1 };
    } else {
      crops[crop].totalYield += yieldValue;
      crops[crop].totalArea += area;
      crops[crop].count += 1;
    }
  });

  return Object.entries(crops).map(([crop, { totalYield, totalArea, count }]) => ({
    crop,
    averageYield: (totalYield / count).toFixed(3),
    averageArea: (totalArea / count).toFixed(3),
  }));
};
