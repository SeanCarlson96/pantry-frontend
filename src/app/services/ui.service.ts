import { Injectable } from '@angular/core';
import { AppUser } from 'src/data/AppUser';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, take } from 'rxjs';
import { AppUserDTO } from 'src/DTOs/AppUserDTO';
import { PantryDTO } from 'src/DTOs/PantryDTO';
import { Pantry } from 'src/data/Pantry';
import { ItemUnit } from 'src/data/ItemUnit';
import { ItemUnitDTO } from 'src/DTOs/ItemUnitDTO';
import { ItemInRecipe } from 'src/data/ItemInRecipe';
import { ItemInRecipeDTO } from 'src/DTOs/ItemInRecipeDTO';
import { Recipe } from 'src/data/Recipe';
import { RecipeDTO } from 'src/DTOs/RecipeDTO';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  public currentPage: string | null
  public loggedIn: boolean = false
  public currentUser = {} as AppUser | null

  public appUsers: AppUser[] = [];
  public appUsersSubject: Subject<AppUser[]> = new Subject();
  public pantries: Pantry[] = [];
  public pantrySubject: Subject<Pantry[]> = new Subject();
  public itemUnits: ItemUnit[] = [];
  public itemUnitsSubject: Subject<ItemUnit[]> = new Subject();
  public itemInRecipes: ItemInRecipe[] = [];
  public itemInRecipesSubject: Subject<ItemInRecipe[]> = new Subject();
  public recipes: Recipe[] = [];
  public recipesSubject: Subject<Recipe[]> = new Subject();

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.currentPage = localStorage.getItem("page") ? localStorage.getItem("page") : 'posts';
    this.currentUser = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser") || '{}') : {} as AppUser;
    this.loggedIn = localStorage.getItem("loggedIn") === 'true' ? true : false;
    this.loadUsers()
    this.loadPantries()
    this.loadItemUnits()
    this.loadItemInRecipes()
    this.loadRecipes()
  }
  setPage(target: string): string{
    localStorage.setItem("page", target);
    return this.currentPage = target
  }
  setCurrentUser(user: AppUser): AppUser{
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("loggedIn", 'true');
    return this.currentUser = user
  }
  logout(){
    this.currentUser = null
    this.loggedIn = false
    localStorage.setItem("loggedIn", 'false')
    this.currentPage='pantry'
  }
  openSnackBar(message: string, action: string){
    this._snackBar.open(message, action);
  }

  ///AppUsers
  whenAppUsersUpdates(): Observable<AppUser[]>{
    return this.appUsersSubject.asObservable();
  }
  loadUsers(): void{
    this.http
      .get<AppUser[]>('http://localhost:8080/appusers')
      .pipe(take(1))
      .subscribe({
          next: users =>{
            this.appUsers = users;
            this.appUsersSubject.next(users);
          },
          error: () => this.openSnackBar('Error loading users', 'Close'),
    })
  }
  getAppUser(liUsername: string, liPassword: string): void {
    this.http
      .get<AppUser>(`http://localhost:8080/appusers?username=${liUsername}&password=${liPassword}`)
      .pipe(take(1))
      .subscribe({
        next: appUser => {
        this.currentUser = appUser
        this.setCurrentUser(appUser)
        this.loggedIn = true
      },
      error: () => this.openSnackBar('Invalid Credentials', 'Close'),
    })
  }
  addAppUser(newUser: AppUserDTO): void {
    this.http
      .post<AppUserDTO>('http://localhost:8080/appusers', newUser)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.openSnackBar('Registered Successfully', 'Close')
          this.loadUsers();
        },
        error: () => this.openSnackBar('This username is already registered', 'Close'),
    })
  }
  updateAppUser(id: number, updatedAppUser: AppUserDTO){
    this.http
      .put<AppUserDTO>(`http://localhost:8080/appusers/${id}`, updatedAppUser)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.openSnackBar('Information updated', 'Close')
          this.loadUsers();
        },
        error: () => this.openSnackBar('Update failed', 'Close'),
    })
  }
  deleteAppUser(id: number): void {
    this.http
      .delete<AppUser>(`http://localhost:8080/appusers/${id}`)
      .pipe(take(1))
      .subscribe({
        next: ()=> this.loadUsers(),
        error: () => this.openSnackBar('Error deleting user', 'Close')
    })
  }

  ///Pantry
  whenPantriesUpdates(): Observable<Pantry[]>{
    return this.pantrySubject.asObservable();
  }
  loadPantries(): void{
    this.http
      .get<Pantry[]>('http://localhost:8080/pantries')
      .pipe(take(1))
      .subscribe({
          next: pantries =>{
            this.pantries = pantries;
            this.pantrySubject.next(pantries);
          },
          error: () => this.openSnackBar('Error loading pantries', 'Close'),
    })
  }
  addPantry(newPantry: PantryDTO): void {
    this.http
      .post<PantryDTO>('http://localhost:8080/pantries', newPantry)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.openSnackBar('Pantry Added', 'Close')
          this.loadPantries();
        },
        error: () => this.openSnackBar('Error adding a new pantry', 'Close'),
    })
  }
  updatePantry(id: number, updatedPantry: PantryDTO){
    this.http
      .put<PantryDTO>(`http://localhost:8080/pantries/${id}`, updatedPantry)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.openSnackBar('Pantry updated', 'Close')
          this.loadPantries();
        },
        error: () => this.openSnackBar('Update failed', 'Close'),
    })
  }
  deletePantry(id: number): void {
    this.http
      .delete<Pantry>(`http://localhost:8080/pantries/${id}`)
      .pipe(take(1))
      .subscribe({
        next: ()=> this.loadPantries(),
        error: () => this.openSnackBar('Error deleting pantry', 'Close')
    })
  }

  ///ItemUnits
  whenItemUnitsUpdates(): Observable<ItemUnit[]>{
    return this.itemUnitsSubject.asObservable();
  }
  loadItemUnits(): void{
    this.http
      .get<ItemUnit[]>('http://localhost:8080/itemunits')
      .pipe(take(1))
      .subscribe({
          next: itemunits =>{
            this.itemUnits = itemunits;
            this.itemUnitsSubject.next(itemunits);
          },
          error: () => this.openSnackBar('Error loading items', 'Close'),
    })
  }
  addItemUnit(newItemUnit: ItemUnitDTO): void {
    this.http
      .post<ItemUnitDTO>('http://localhost:8080/itemunits', newItemUnit)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.openSnackBar('Item Added', 'Close')
          this.loadItemUnits();
        },
        error: () => this.openSnackBar('Error adding a new item', 'Close'),
    })
  }
  updateItemUnit(id: number, updatedItemUnit: ItemUnitDTO){
    this.http
      .put<ItemUnitDTO>(`http://localhost:8080/itemunits/${id}`, updatedItemUnit)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.openSnackBar('Item updated', 'Close')
          this.loadItemUnits();
        },
        error: () => this.openSnackBar('Update failed', 'Close'),
    })
  }
  deleteItemUnit(id: number): void {
    this.http
      .delete<ItemUnit>(`http://localhost:8080/itemunits/${id}`)
      .pipe(take(1))
      .subscribe({
        next: ()=> this.loadItemUnits(),
        error: () => this.openSnackBar('Error deleting item', 'Close')
    })
  }

  ///ItemInRecipes
  whenItemInRecipesUpdates(): Observable<ItemInRecipe[]>{
    return this.itemInRecipesSubject.asObservable();
  }
  loadItemInRecipes(): void{
    this.http
      .get<ItemInRecipe[]>('http://localhost:8080/iteminrecipes')
      .pipe(take(1))
      .subscribe({
          next: itemInRecipes =>{
            this.itemInRecipes = itemInRecipes;
            this.itemInRecipesSubject.next(itemInRecipes);
          },
          error: () => this.openSnackBar('Error loading recipe items', 'Close'),
    })
  }
  addItemInRecipe(newItemInRecipe: ItemInRecipeDTO): void {
    this.http
      .post<ItemInRecipeDTO>('http://localhost:8080/iteminrecipes', newItemInRecipe)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.openSnackBar('Recipe Item Added', 'Close')
          this.loadItemInRecipes();
        },
        error: () => this.openSnackBar('Error adding a new recipe item', 'Close'),
    })
  }
  updateItemInRecipe(id: number, updatedItemInRecipe: ItemInRecipeDTO){
    this.http
      .put<ItemInRecipeDTO>(`http://localhost:8080/iteminrecipes/${id}`, updatedItemInRecipe)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.openSnackBar('Item updated', 'Close')
          this.loadItemInRecipes();
        },
        error: () => this.openSnackBar('Update failed', 'Close'),
    })
  }
  deleteItemInRecipe(id: number): void {
    this.http
      .delete<ItemInRecipe>(`http://localhost:8080/iteminrecipes/${id}`)
      .pipe(take(1))
      .subscribe({
        next: ()=> this.loadItemInRecipes(),
        error: () => this.openSnackBar('Error deleting recipe item', 'Close')
    })
  }

  ///Recipes
  whenRecipesUpdates(): Observable<Recipe[]>{
    return this.recipesSubject.asObservable();
  }
  loadRecipes(): void{
    this.http
      .get<Recipe[]>('http://localhost:8080/recipes')
      .pipe(take(1))
      .subscribe({
          next: recipes =>{
            this.recipes = recipes;
            this.recipesSubject.next(recipes);
          },
          error: () => this.openSnackBar('Error loading recipes', 'Close'),
    })
  }
  addRecipe(newRecipe: RecipeDTO): void {
    this.http
      .post<RecipeDTO>('http://localhost:8080/recipes', newRecipe)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.openSnackBar('Recipe Added', 'Close')
          this.loadRecipes();
        },
        error: () => this.openSnackBar('Error adding a new recipe', 'Close'),
    })
  }
  updateRecipe(id: number, updatedRecipe: RecipeDTO){
    this.http
      .put<RecipeDTO>(`http://localhost:8080/recipes/${id}`, updatedRecipe)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.openSnackBar('Recipe updated', 'Close')
          this.loadRecipes();
        },
        error: () => this.openSnackBar('Update failed', 'Close'),
    })
  }
  deleteRecipe(id: number): void {
    this.http
      .delete<Recipe>(`http://localhost:8080/recipes/${id}`)
      .pipe(take(1))
      .subscribe({
        next: ()=> this.loadRecipes(),
        error: () => this.openSnackBar('Error deleting recipe', 'Close')
    })
  }

}