import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../core/services/auth.service';
import { UIService } from '../../../core/services/ui.service';
import { CryptoService } from '../../../core/services/crypto.service';
import { TokenPayload } from '../../../core/models/request/token-payload';

@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule, InputTextModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    form!: FormGroup;

    backgrounds = [
        {
            title: "Difuminado",
            key: "blurred",
            items: Array.from({ length: 16 }, (_, i) => i + 1)
        },
        {
            title: "Geométrico",
            key: "polygon",
            items: Array.from({ length: 16 }, (_, i) => i + 1)
        },
        {
            title: "Abstracto",
            key: "abstract",
            items: Array.from({ length: 16 }, (_, i) => i + 1)
        }
    ];

    activeBackground = signal<string>("/premium/boxed-bg/polygon/bg/7.jpg");

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private uiService: UIService,
        private cryptoService: CryptoService
    ){
        this.form = formBuilder.group({
            username: ["", [Validators.required]],
            password: ["", [Validators.required]]
        })
    }

    setActiveBackground(key: string, item: number) {
        this.activeBackground.set(`/premium/boxed-bg/${key}/bg/${item}.jpg`);
    }

    isBackgroundActive(key: string, item: number){
        return this.activeBackground() == `/premium/boxed-bg/${key}/bg/${item}.jpg`;
    }

    sendForm(){ 
        
        this.authService.requestLogin(this.form.value).subscribe(res => {
            if(res.status == "OK"){
                const token = res.data.token;
                this.handleLoginResponse(token, res.data.roles);
            }
        })
        
    }

    handleLoginResponse(token: string, roles: string[]): void{
        let [header, payloadChunk] = token.split(".");
        let payload: TokenPayload = JSON.parse(atob(payloadChunk))



        if (payload.sub == "RolePick") {
            /* if(payload.roles) */
                /* this.dialogService.open(SelectRoleComponent, {
                    header: "Seleccione Rol",
                    data: {
                        roles: roles//payload.roles.map(item => item.toLocaleLowerCase())
                    },
                    focusOnShow: false
                }).onClose.subscribe(res => {
                    if(res){
                        
                        this.authService.selectRole(token, res).subscribe(res => {
                            this.doLogin(res.data.token)
                        });
                        
                    }
                    
                }) */
                
        } else { 
            //this.doLogin(token)
            this.authService.permitLogin(token);
        }
    }
}
