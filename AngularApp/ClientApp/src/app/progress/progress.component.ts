import { Time } from "@angular/common";
import { Component } from "@angular/core";


@Component({
    selector: 'progress-bar',
    templateUrl: './progress.component.html'
})

export class ProgressComponent
{
    public percent: number = 0;
    public interval: any;
    public start: boolean = false;

    constructor()
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
}