import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule }  from '@angular/material/progress-spinner';
import { Message } from '../models/message';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { OllamaService } from '../services/ollama.service';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
   messages:  Message[] = [];
   messageSent: boolean = false;
   messageForm!: FormGroup;

   constructor(private fb: FormBuilder, private ollamaSvc : OllamaService){
      this.messageForm = this.fb.group({
        text: ['', [Validators.required, Validators.minLength(3)]],
      });    
   }

   ngOnInit(): void {
       
   }

   sendMessage(){
      console.log("send message !");
      //this.messageSent = true;
      let msgValue = this.messageForm.get('text')?.value;
      console.log(msgValue);
      if(msgValue.length > 0){
         this.messageSent = true;
         this.messages.push({text: msgValue, sender: 'me', timestamp: new Date()});
         this.ollamaSvc.chatWithOllama(msgValue).then((response) => {
            console.log(response);
            this.messages.push({text: response, sender: 'ollama', timestamp: new Date()});
            this.messageSent = false;
        });
      }
   }
}
