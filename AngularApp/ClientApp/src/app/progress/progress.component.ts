import { Time } from "@angular/common";
import { HttpClient, HttpEventType } from "@angular/common/http";
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

    public selectedFile: File = {} as File;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string)
    {

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

    onFileChange(e: Event)
    {
        var element: HTMLInputElement = e.target as HTMLInputElement;
        var list: FileList = element.files as FileList;
        this.selectedFile = list[0];
        
        const formData: FormData = new FormData();

        formData.append('file', this.selectedFile, this.selectedFile?.name);

        this.http.post<any>(
            'https://localhost:44392/' + 'api/WeatherForecast/UploadFile',
            formData,
            { reportProgress: true, observe: 'events'}).subscribe(event =>
                {
                    console.log('some event',event);
                    if (event.type === HttpEventType.UploadProgress) {
                        console.log('UploadProgress');
                    }
                    if (event.type === HttpEventType.Response) {
                        console.log('donwload completed');
                    }
                });
 
    }
}