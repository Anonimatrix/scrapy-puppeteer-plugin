# Scrapy puppeteer plugin

Este es un servicio que provee la funcionalidad de puppeteer para la libreria [Scrapy](https://github.com/Anonimatrix/scrapy) . Permite el uso de plugins de puppeteer-extra-plugin, inyectandolos en una propiedad plugins dentro de providers y unicamente es una capa sobre el modulo de puppeteer. Este servicio es el que se usa en el ejemplo de uso.

## Instalacion

Antes debe tener instalado la libreria scrapy para poder utilizarlo en ella

```sh
    npm i @xkairo/scrapy
```

Despues de instalar scrap, ya puede instalar esta libreria

```sh
    npm i @xkairo/scrapy-puppeteer-plugin
```

## Configuracion

Para agregar una configuracion a puppeteer debe usar un provider, en el cual agregaras los plugins propios de puppeteer-plugin-extra y la configuracion de la instancia de puppeteer.
El provider debera agregarlo en la configuracion de scrapy.

```typescript
    export const puppeteerProvider: Registable = {
        plugins: {
            useValue: [],
        },
        config: {
            useValue: {
                headless: true,
            },
        },
    };

```

```typescript
    const filepath = join(__dirname, "result.csv");
    const config: ScraperConfigInterface<UserInterface> = {
      uploaders: [LocalUploader],
      processors: [CsvProcessor],
      scrapers: [PageScraper],
      services: [Puppeteer], // <---- Note como aca se agrega el servicio para luego injectarlo
      providers: [
        puppeteerProvider, // <---- Note como se carga el provider con la configuracion
        {
          filepath: {
            useValue: filepath,
          },
        },
      ],
      exceptionHandler: ExceptionHandler,
    };

    const scraper = new Scraper(config);

    await scraper.init();
```

## Uso

Hay que tener en cuenta que la libreria scrapy utiliza un sistema de injeccion de dependencias con inversion de control, por lo que usted no deberia instanciar este servicio, sino que injectarlo.

```typescript
    constructor(
        @Inject(Puppeteer) private puppeteerService: Puppeteer
    ) {}
```

Luego podra acceder al browser con *getBrowser*: 
```typescript
    async commonFunction() {
        const browser = await this.puppeteerService.getBrowser(); // <---- Obtenemos un browser de puppeteer

        browser.newPage() // <---- Puedes usar cualquier metodo de browser
    }
```