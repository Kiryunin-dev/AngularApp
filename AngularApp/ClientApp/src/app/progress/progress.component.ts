import { Time } from "@angular/common";
import { HttpClient, HttpEventType, HttpHeaders } from "@angular/common/http";
import { Component, Inject } from "@angular/core";


@Component({
    selector: 'progress-bar',
    templateUrl: './progress.component.html'
})

export class ProgressComponent
{
    public percent: number = 0;
    public interval: any;
    public start: boolean = false;

    isFileSected: boolean = false;

    public processPers: number = 0;
    public endMessage: string = '';
    public selectedFile: File = {} as File;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string)
    {
        console.log('baseUrl', baseUrl);
        
    }

    startProgress()
    {
        this.percent = 0;
        this.start = true;
        clearInterval(this.interval);

        this.interval = setInterval(() =>
        {     
            this.percent = parseFloat((this.percent + 0.1).toFixed(2));         
            if (this.percent >= 100)
            {
                clearInterval(this.interval);
            }
            
        }, 10);
    }

    stpoProgress()
    {
        this.start = false;
        clearInterval(this.interval);
    }

    continue()
    {
        if (this.start === false)
        {
            this.start = true;
            this.interval = setInterval(() =>
            {     
                this.percent = parseFloat((this.percent + 0.1).toFixed(2));         
                if (this.percent >= 100)
                {
                    clearInterval(this.interval);
                }
                
            }, 10);
        }
    }

    fileSelected(e: Event)
    {
        var element: HTMLInputElement = e.target as HTMLInputElement;
        var list: FileList = element.files as FileList;
        this.selectedFile = list[0];
        this.endMessage = '';
        this.processPers = 0;

    }

    loadFile()
    {
        this.endMessage = '';
        this.processPers = 0;

        const formData: FormData = new FormData();

        formData.append('file', this.selectedFile, this.selectedFile?.name);

        this.http.post<any>(this.baseUrl + 'api/WeatherForecast/UploadFile',
            formData,
            { reportProgress: true, observe: 'events'}).subscribe(event =>
                {
                    console.log('some event',event);
                    if (event.type === HttpEventType.UploadProgress)
                    {
                        if (event.total)
                        {
                            this.processPers =  Number.parseInt(((100 * event.loaded)/ event.total).toFixed(0));
                        }
                        
                        console.log('UploadProgress');
                    }
                    if (event.type === HttpEventType.Response)
                    {
                        this.endMessage = 'Загрузка завершена';
                    }
                });
                
    }

    downloadFile()
    {
        let  headers= new HttpHeaders({
            'Content-Type':  'image/jpeg',
            responseType : 'blob',
            Accept : 'image/jpeg',
            observe : 'response'
            })

        this.http.get(this.baseUrl + 'api/WeatherForecast/DownloadImage' , {headers: headers, responseType: 'blob'})
        .subscribe(blob => 
        {
            var image = new Blob([blob], {type: "image/jpeg"});
            console.log(blob);
            var link = document.createElement('a');
            link.href = URL.createObjectURL(image);
            link.download = "new.jpeg";
            link.click();
            link.remove();
        });

    }
}