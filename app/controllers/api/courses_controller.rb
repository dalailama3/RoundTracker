module Api
  class CoursesController < ApiController
    before_action :require_login

    def index
      @courses = Course.all

      render json: @courses
    end

    def new
      @course = Course.new
    end

    def show
      @course = Course.find(params[:id])

      render json: @course

    end

    def create
      @course = Course.new(course_params)
      @course.par_hash = par_hash

      if @course.save
        render json: @course
      else
        render json: @course.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy

      @course = Course.find(params[:id])
      @course.destroy
      # redirect_to rounds_url
      render json: {}
    end

    def edit
      @course = Course.find(params[:id])

    end

    def update
      @course = Course.find(params[:id])

      if @course.update_attributes(course_params)
        render :json => @course
      else
        render :json => @course.errors, :status => :unprocessable_entity
      end

    end

    private

    def course_params
      params.require(:course).permit(:name, :image)

    end

    def par_hash
      par_hash = {}
      params.each do |param, val|
        if param.start_with?("hole")
          par_hash[param] = val
        end
      end
      par_hash
    end

    def images_hash
      images_hash = {}
      params[:course].each do |param, val|
        if param.start_with?("hole_img")
          images_hash[param] = val
        end
      end
      images_hash
    end
  end
end
